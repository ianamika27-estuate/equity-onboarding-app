import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { FileText, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Info } from 'lucide-react';
import { StructuredMailingAddress } from '../../App';

interface WarrantInfoData {
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
  cheque_payment_delivery_address?: StructuredMailingAddress;
  wire_transfer_financial_institution_name: string;
  wire_transfer_financial_institution_swift_bic_code: string;
  wire_transfer_branch_address?: StructuredMailingAddress;
  wire_transfer_aba_number: string;
  wire_transfer_chips_number: string;
}

interface WarrantInfoProps {
  data: WarrantInfoData;
  onUpdate: (data: WarrantInfoData) => void;
}

const PAYMENT_METHODS = [
  { value: 'ACH', label: 'ACH Transfer' },
  { value: 'WIRE_TRANSFER', label: 'Wire Transfer' },
  { value: 'CREDIT_CARD_OR_DIGITAL_WALLET', label: 'Credit Card / Digital Wallet' },
  { value: 'CHECK', label: 'Check' },
];

export function WarrantInfo({ data, onUpdate }: WarrantInfoProps) {
  // Defensive check - ensure data is defined
  if (!data) {
    return <div>Loading...</div>;
  }

  const handleChange = (field: keyof WarrantInfoData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const handleAddressChange = (
    addressField: 'cheque_payment_delivery_address' | 'wire_transfer_branch_address',
    field: keyof StructuredMailingAddress,
    value: string
  ) => {
    onUpdate({
      ...data,
      [addressField]: {
        ...(data[addressField] || {
          street1: '',
          street2: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'US',
        }),
        [field]: value,
      },
    });
  };

  const togglePaymentMethod = (method: string) => {
    const currentMethods = data.allowed_payment_methods
      ? data.allowed_payment_methods.split(',').filter((m) => m.trim())
      : [];
    
    const index = currentMethods.indexOf(method);
    let newMethods: string[];
    
    if (index > -1) {
      newMethods = currentMethods.filter((m) => m !== method);
    } else {
      newMethods = [...currentMethods, method];
    }
    
    handleChange('allowed_payment_methods', newMethods.join(','));
  };

  const isPaymentMethodSelected = (method: string) => {
    if (!data || !data.allowed_payment_methods) {
      return false;
    }
    const methods = data.allowed_payment_methods.split(',').filter((m) => m.trim());
    return methods.includes(method);
  };

  const showCheckAddress = isPaymentMethodSelected('CHECK');
  const showWireTransferFields = isPaymentMethodSelected('WIRE_TRANSFER');

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
        <div className="flex gap-3">
          <div className="size-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">Warrant Information</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Configure warrant exercise terms, payment methods, and related details for this security instrument.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Warrant Details */}
      <div>
        <h3 className="text-gray-900 mb-6">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="internal_id">Internal ID</Label>
            <Input
              id="internal_id"
              value={data.internal_id}
              onChange={(e) => handleChange('internal_id', e.target.value)}
              placeholder="WRT-001"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="exercise_to">Exercise To (Issue Internal ID)</Label>
            <Input
              id="exercise_to"
              value={data.exercise_to}
              onChange={(e) => handleChange('exercise_to', e.target.value)}
              placeholder="ISS-001"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiry_date">Expiry Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                id="expiry_date"
                type="date"
                value={data.expiry_date}
                onChange={(e) => handleChange('expiry_date', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="is_exercisable">Exercisable Status</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="size-4 text-gray-400 hover:text-gray-600">
                      <Info className="size-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm max-w-xs">Indicates whether the warrant can currently be exercised.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-3 h-10 px-4 border border-gray-200 rounded-lg">
              <Checkbox
                id="is_exercisable"
                checked={data.is_exercisable}
                onCheckedChange={(checked) => handleChange('is_exercisable', checked === true)}
              />
              <label htmlFor="is_exercisable" className="text-sm cursor-pointer">
                Warrant is currently exercisable
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Terms */}
      <div>
        <h3 className="text-gray-900 mb-6">Exercise Terms</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="warrant_exercise_terms_price">Exercise Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                id="warrant_exercise_terms_price"
                type="text"
                value={data.warrant_exercise_terms_price}
                onChange={(e) => handleChange('warrant_exercise_terms_price', e.target.value)}
                placeholder="10.00"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="exercise_ratio">Exercise Ratio</Label>
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                id="exercise_ratio"
                type="text"
                value={data.exercise_ratio}
                onChange={(e) => handleChange('exercise_ratio', e.target.value)}
                placeholder="1.0"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="warrant_exercise_terms_start_date">Exercise Start Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                id="warrant_exercise_terms_start_date"
                type="date"
                value={data.warrant_exercise_terms_start_date}
                onChange={(e) => handleChange('warrant_exercise_terms_start_date', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="warrant_exercise_terms_end_date">Exercise End Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <Input
                id="warrant_exercise_terms_end_date"
                type="date"
                value={data.warrant_exercise_terms_end_date}
                onChange={(e) => handleChange('warrant_exercise_terms_end_date', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="number_of_exercise_terms">Number of Exercise Terms</Label>
            <Input
              id="number_of_exercise_terms"
              type="text"
              value={data.number_of_exercise_terms}
              onChange={(e) => handleChange('number_of_exercise_terms', e.target.value)}
              placeholder="1"
            />
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h3 className="text-gray-900 mb-6">Allowed Payment Methods</h3>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          {PAYMENT_METHODS.map((method) => (
            <div key={method.value} className="flex items-center gap-3">
              <Checkbox
                id={`payment_${method.value}`}
                checked={isPaymentMethodSelected(method.value)}
                onCheckedChange={() => togglePaymentMethod(method.value)}
              />
              <label
                htmlFor={`payment_${method.value}`}
                className="text-sm cursor-pointer"
              >
                {method.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Check Payment Address */}
      {showCheckAddress && (
        <div>
          <h3 className="text-gray-900 mb-6">Check Payment Delivery Address</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cheque_street1">Street Address 1</Label>
              <Input
                id="cheque_street1"
                value={data.cheque_payment_delivery_address?.street1 || ''}
                onChange={(e) => handleAddressChange('cheque_payment_delivery_address', 'street1', e.target.value)}
                placeholder="123 Main St"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cheque_street2">Street Address 2 (Optional)</Label>
              <Input
                id="cheque_street2"
                value={data.cheque_payment_delivery_address?.street2 || ''}
                onChange={(e) => handleAddressChange('cheque_payment_delivery_address', 'street2', e.target.value)}
                placeholder="Suite 100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cheque_city">City</Label>
                <Input
                  id="cheque_city"
                  value={data.cheque_payment_delivery_address?.city || ''}
                  onChange={(e) => handleAddressChange('cheque_payment_delivery_address', 'city', e.target.value)}
                  placeholder="New York"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cheque_state">State / Province</Label>
                <Input
                  id="cheque_state"
                  value={data.cheque_payment_delivery_address?.state || ''}
                  onChange={(e) => handleAddressChange('cheque_payment_delivery_address', 'state', e.target.value)}
                  placeholder="NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cheque_postalCode">Postal Code</Label>
                <Input
                  id="cheque_postalCode"
                  value={data.cheque_payment_delivery_address?.postalCode || ''}
                  onChange={(e) => handleAddressChange('cheque_payment_delivery_address', 'postalCode', e.target.value)}
                  placeholder="10001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cheque_country">Country</Label>
                <Input
                  id="cheque_country"
                  value={data.cheque_payment_delivery_address?.country || 'US'}
                  onChange={(e) => handleAddressChange('cheque_payment_delivery_address', 'country', e.target.value)}
                  placeholder="US"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wire Transfer Details */}
      {showWireTransferFields && (
        <div>
          <h3 className="text-gray-900 mb-6">Wire Transfer Information</h3>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="wire_transfer_financial_institution_name">Financial Institution Name</Label>
                <Input
                  id="wire_transfer_financial_institution_name"
                  value={data.wire_transfer_financial_institution_name}
                  onChange={(e) => handleChange('wire_transfer_financial_institution_name', e.target.value)}
                  placeholder="Bank Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wire_transfer_financial_institution_swift_bic_code">SWIFT / BIC Code</Label>
                <Input
                  id="wire_transfer_financial_institution_swift_bic_code"
                  value={data.wire_transfer_financial_institution_swift_bic_code}
                  onChange={(e) => handleChange('wire_transfer_financial_institution_swift_bic_code', e.target.value)}
                  placeholder="CHASUS33"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wire_transfer_aba_number">ABA Routing Number</Label>
                <Input
                  id="wire_transfer_aba_number"
                  value={data.wire_transfer_aba_number}
                  onChange={(e) => handleChange('wire_transfer_aba_number', e.target.value)}
                  placeholder="021000021"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wire_transfer_chips_number">CHIPS Number (Optional)</Label>
                <Input
                  id="wire_transfer_chips_number"
                  value={data.wire_transfer_chips_number}
                  onChange={(e) => handleChange('wire_transfer_chips_number', e.target.value)}
                  placeholder="0001"
                />
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 mb-4">Branch Address</h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wire_street1">Street Address 1</Label>
                  <Input
                    id="wire_street1"
                    value={data.wire_transfer_branch_address?.street1 || ''}
                    onChange={(e) => handleAddressChange('wire_transfer_branch_address', 'street1', e.target.value)}
                    placeholder="123 Bank St"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wire_street2">Street Address 2 (Optional)</Label>
                  <Input
                    id="wire_street2"
                    value={data.wire_transfer_branch_address?.street2 || ''}
                    onChange={(e) => handleAddressChange('wire_transfer_branch_address', 'street2', e.target.value)}
                    placeholder="Floor 5"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wire_city">City</Label>
                    <Input
                      id="wire_city"
                      value={data.wire_transfer_branch_address?.city || ''}
                      onChange={(e) => handleAddressChange('wire_transfer_branch_address', 'city', e.target.value)}
                      placeholder="New York"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wire_state">State / Province</Label>
                    <Input
                      id="wire_state"
                      value={data.wire_transfer_branch_address?.state || ''}
                      onChange={(e) => handleAddressChange('wire_transfer_branch_address', 'state', e.target.value)}
                      placeholder="NY"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wire_postalCode">Postal Code</Label>
                    <Input
                      id="wire_postalCode"
                      value={data.wire_transfer_branch_address?.postalCode || ''}
                      onChange={(e) => handleAddressChange('wire_transfer_branch_address', 'postalCode', e.target.value)}
                      placeholder="10001"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wire_country">Country</Label>
                    <Input
                      id="wire_country"
                      value={data.wire_transfer_branch_address?.country || 'US'}
                      onChange={(e) => handleAddressChange('wire_transfer_branch_address', 'country', e.target.value)}
                      placeholder="US"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex gap-3">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>Tip:</strong> Ensure all warrant exercise terms are properly reviewed and approved before submission. Payment methods can be updated later if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}