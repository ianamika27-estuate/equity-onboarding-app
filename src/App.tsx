import { useState, useEffect } from 'react';
import { FormSidebar } from './components/FormSidebar';
import { IssuerInfo } from './components/form-steps/IssuerInfo';
import { IssueInfo } from './components/form-steps/IssueInfo';
import { PreferredInfo } from './components/form-steps/ConversionInfo';
import { WarrantInfo } from './components/form-steps/WarrantInfo';
import { ListingInfo } from './components/form-steps/ListingInfo';
import { IssuerAdminInfo } from './components/form-steps/IssuerAdminInfo';
import { ReviewSubmit } from './components/form-steps/ReviewSubmit';
import { Button } from './components/ui/button';
import { Save, ArrowRight, ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface StructuredMailingAddress {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface FormData {
  issuer: {
    legal_name: string;
    dba: string;
    legal_address: StructuredMailingAddress;
    contact_address: StructuredMailingAddress;
    organization_type: string;
    country_of_formation: string;
    country_subdivision_of_formation: string;
    formation_date: string;
    tax_ids: {
      tax_id: string;
      country: string;
    };
    email: string;
    phone: string;
    company_website: string;
    central_index_key: string;
    is_sec_reporting: boolean;
    is_shell_issuer: boolean;
    quorum_requirement: string;
    year_end: string;
    active_date: string;
    original_medallion_waiver: boolean;
    drs_payment_fee: string;
    requires_issuer_approval_for_legal_counsel: boolean;
  };
  issue: {
    internal_id: string;
    name: string;
    class_type: string;
    class_state: string;
    cusip: string;
    isin: string;
    dtc_eligible: boolean;
    fast_eligible: boolean;
    dtc_eligibility_change_date: string;
    fast_eligibility_change_date: string;
    board_approval_date: string;
    votes_per_share: string;
    dividend: boolean;
    par_value: {
      amount: string;
      currency: string;
    };
    price_per_share: {
      amount: string;
      currency: string;
    };
    accept_sales: boolean;
    fractional_shares: boolean;
    allowable_decimals: string;
    allow_certificates: boolean;
    authorization_date: string;
    initial_shares_authorized: string;
  };
  conversion: {
    internal_id: string;
    participating: boolean;
    start_date: string;
    maturity_date: string;
    redeemable: boolean;
    redemption_date: string;
    conversion_mechanism_type: string;
    converts_to: string;
    conversion_calculation: string;
    online_conversions: boolean;
  };
  warrant: {
    internal_id: string;
    warrant_exercise_terms_price: string;
    warrant_exercise_terms_start_date: string;
    warrant_exercise_terms_end_date: string;
    expiry_date: string;
    exercise_to: string;
    exercise_ratio: string;
    number_of_exercise_terms: string;
    is_exercisable: boolean;
    allowed_payment_methods: string;
    wire_transfer_financial_institution_name: string;
    wire_transfer_financial_institution_swift_bic_code: string;
    wire_transfer_aba_number: string;
    wire_transfer_chips_number: string;
  };
  listing: {
    internal_id: string;
    ticker: string;
    exchange: string;
    listing_date: string;
  };
  issuer_admin: {
    legal_name: string;
    email_address: string;
    job_title: string;
    admin: boolean;
    director: boolean;
    authorized_officer: boolean;
    on_certificate_of_incumbency: boolean;
    kyc_complete: boolean;
    authenticated_email: boolean;
  };
}

const STORAGE_KEY = 'financial-onboarding-form';

const initialFormData: FormData = {
  issuer: {
    legal_name: '',
    dba: '',
    legal_address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
    },
    contact_address: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
    },
    organization_type: '',
    country_of_formation: '',
    country_subdivision_of_formation: '',
    formation_date: '',
    tax_ids: {
      tax_id: '',
      country: 'US',
    },
    email: '',
    phone: '',
    company_website: '',
    central_index_key: '',
    is_sec_reporting: false,
    is_shell_issuer: false,
    quorum_requirement: '',
    year_end: '',
    active_date: '',
    original_medallion_waiver: false,
    drs_payment_fee: '',
    requires_issuer_approval_for_legal_counsel: false,
  },
  issue: {
    internal_id: '',
    name: '',
    class_type: '',
    class_state: '',
    cusip: '',
    isin: '',
    dtc_eligible: false,
    fast_eligible: false,
    dtc_eligibility_change_date: '',
    fast_eligibility_change_date: '',
    board_approval_date: '',
    votes_per_share: '',
    dividend: false,
    par_value: {
      amount: '',
      currency: 'USD',
    },
    price_per_share: {
      amount: '',
      currency: 'USD',
    },
    accept_sales: false,
    fractional_shares: false,
    allowable_decimals: '',
    allow_certificates: false,
    authorization_date: '',
    initial_shares_authorized: '',
  },
  conversion: {
    internal_id: '',
    participating: false,
    start_date: '',
    maturity_date: '',
    redeemable: false,
    redemption_date: '',
    conversion_mechanism_type: '',
    converts_to: '',
    conversion_calculation: '',
    online_conversions: false,
  },
  warrant: {
    internal_id: '',
    warrant_exercise_terms_price: '',
    warrant_exercise_terms_start_date: '',
    warrant_exercise_terms_end_date: '',
    expiry_date: '',
    exercise_to: '',
    exercise_ratio: '',
    number_of_exercise_terms: '',
    is_exercisable: false,
    allowed_payment_methods: '',
    wire_transfer_financial_institution_name: '',
    wire_transfer_financial_institution_swift_bic_code: '',
    wire_transfer_aba_number: '',
    wire_transfer_chips_number: '',
  },
  listing: {
    internal_id: '',
    ticker: '',
    exchange: '',
    listing_date: '',
  },
  issuer_admin: {
    legal_name: '',
    email_address: '',
    job_title: '',
    admin: false,
    director: false,
    authorized_officer: false,
    on_certificate_of_incumbency: false,
    kyc_complete: false,
    authenticated_email: false,
  },
};

const steps = [
  { id: 'issuer', title: 'Issuer Information', description: 'Company details', icon: '🏢' },
  { id: 'issue', title: 'Issue', description: 'Security class details', icon: '📜' },
  { id: 'preferred', title: 'Preferred', description: 'Conversion & redemption', icon: '🔄' },
  { id: 'warrant', title: 'Warrant', description: 'Exercise terms & payment', icon: '💳' },
  { id: 'listing', title: 'Listing', description: 'Exchange listing details', icon: '📈' },
  { id: 'issuer_admin', title: 'Issuer Admin', description: 'Admin contact details', icon: '👥' },
  { id: 'review', title: 'Review & Submit', description: 'Final review', icon: '✓' },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { data, step, timestamp } = JSON.parse(saved);
        // Ensure all data exists for backwards compatibility
        const loadedData = {
          ...initialFormData,
          ...data,
          warrant: data.warrant || initialFormData.warrant,
          listing: data.listing || initialFormData.listing,
          issuer_admin: data.issuer_admin || initialFormData.issuer_admin,
        };
        setFormData(loadedData);
        setCurrentStep(step);
        setLastSaved(new Date(timestamp));
        toast.success('Welcome back! Your progress has been restored.');
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const saveProgress = () => {
    setIsSaving(true);
    setTimeout(() => {
      const saveData = {
        data: formData,
        step: currentStep,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
      setLastSaved(new Date());
      setIsSaving(false);
      toast.success('Progress saved successfully');
    }, 500);
  };

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      saveProgress();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <IssuerInfo
            data={formData.issuer}
            onUpdate={(data) => updateFormData('issuer', data)}
          />
        );
      case 1:
        return (
          <IssueInfo
            data={formData.issue}
            onUpdate={(data) => updateFormData('issue', data)}
          />
        );
      case 2:
        return (
          <PreferredInfo
            data={formData.conversion}
            onUpdate={(data) => updateFormData('conversion', data)}
          />
        );
      case 3:
        return (
          <WarrantInfo
            data={formData.warrant}
            onUpdate={(data) => updateFormData('warrant', data)}
          />
        );
      case 4:
        return (
          <ListingInfo
            data={formData.listing}
            onUpdate={(data) => updateFormData('listing', data)}
          />
        );
      case 5:
        return (
          <IssuerAdminInfo
            data={formData.issuer_admin}
            onUpdate={(data) => updateFormData('issuer_admin', data)}
          />
        );
      case 6:
        return <ReviewSubmit formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <FormSidebar
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
        lastSaved={lastSaved}
      />
      
      <div className="flex-1 lg:ml-80">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="size-5 text-white" />
                </div>
                <div>
                  <h2 className="text-gray-900">Corporate Securities Onboarding</h2>
                  <p className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={saveProgress}
                disabled={isSaving}
                className="shadow-sm"
              >
                <Save className="mr-2 size-4" />
                {isSaving ? 'Saving...' : 'Save Progress'}
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-8">
            <div className="h-1.5 bg-gray-100 relative">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm mb-4">
              <span className="text-lg">{steps[currentStep].icon}</span>
              <span>Section {currentStep + 1} of {steps.length}</span>
            </div>
            <h1 className="text-gray-900 mb-3">{steps[currentStep].title}</h1>
            <p className="text-gray-600 text-lg">{steps[currentStep].description}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 0}
              size="lg"
            >
              <ArrowLeft className="mr-2 size-5" />
              Previous
            </Button>
            
            <div className="flex items-center gap-3">
              {currentStep < steps.length - 1 ? (
                <>
                  <Button variant="outline" onClick={saveProgress} size="lg">
                    Save & Exit
                  </Button>
                  <Button onClick={nextStep} size="lg" className="shadow-lg shadow-blue-500/30">
                    Continue
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => {
                    saveProgress();
                    toast.success('Form submitted successfully! 🎉');
                  }}
                  size="lg"
                  className="shadow-lg shadow-green-500/30 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white mt-12">
          <div className="max-w-4xl mx-auto px-8 py-6">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <p>© 2024 SecuritiesPro. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <button className="hover:text-gray-700 transition-colors">Privacy Policy</button>
                <button className="hover:text-gray-700 transition-colors">Terms of Service</button>
                <button className="hover:text-gray-700 transition-colors">Help Center</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}