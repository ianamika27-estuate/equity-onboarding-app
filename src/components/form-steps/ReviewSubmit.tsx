import { FormData } from '../../App';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { CheckCircle2, Building2, Briefcase, TrendingUp, CreditCard, AlertCircle, Edit, List, UserCog } from 'lucide-react';
import { Button } from '../ui/button';

interface ReviewSubmitProps {
  formData: FormData;
}

export function ReviewSubmit({ formData }: ReviewSubmitProps) {
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatAddress = (address: any) => {
    if (!address || !address.street1) return '-';
    return `${address.street1}${address.street2 ? `, ${address.street2}` : ''}${address.city ? `, ${address.city}` : ''}${address.state ? `, ${address.state}` : ''}${address.postalCode ? ` ${address.postalCode}` : ''}${address.country ? `, ${address.country}` : ''}`;
  };

  const totalIncome = 0; // Removed income calculation
  const totalDeductions = 0; // Removed deductions calculation
  const estimatedTaxableIncome = Math.max(0, totalIncome - totalDeductions);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
        <div className="flex gap-3">
          <div className="size-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">Review Before Submitting</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Please carefully review all information below. You can click on any section to go back and make changes before submitting.
            </p>
          </div>
        </div>
      </div>

      {/* Issuer Information Card */}
      <Card className="border-2 hover:border-blue-300 transition-all">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="size-5 text-blue-600" />
              </div>
              <CardTitle>Issuer Information</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Legal Name</p>
              <p className="text-gray-900">{formData.issuer.legal_name || '-'}</p>
            </div>
            {formData.issuer.dba && (
              <div>
                <p className="text-xs text-gray-500 mb-1">DBA</p>
                <p className="text-gray-900">{formData.issuer.dba}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500 mb-1">Organization Type</p>
              <p className="text-gray-900">{formData.issuer.organization_type?.replace(/_/g, ' ') || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Central Index Key</p>
              <p className="text-gray-900">{formData.issuer.central_index_key || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Country of Formation</p>
              <p className="text-gray-900">{formData.issuer.country_of_formation || '-'}</p>
            </div>
            {formData.issuer.country_subdivision_of_formation && (
              <div>
                <p className="text-xs text-gray-500 mb-1">State of Formation</p>
                <p className="text-gray-900">{formData.issuer.country_subdivision_of_formation}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500 mb-1">Formation Date</p>
              <p className="text-gray-900">{formData.issuer.formation_date || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Fiscal Year End</p>
              <p className="text-gray-900">{formData.issuer.year_end || '-'}</p>
            </div>
            {formData.issuer.tax_ids?.tax_id && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Tax ID / EIN</p>
                <p className="text-gray-900">{formData.issuer.tax_ids.tax_id} ({formData.issuer.tax_ids.country})</p>
              </div>
            )}
            {formData.issuer.email && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-gray-900">{formData.issuer.email}</p>
              </div>
            )}
            {formData.issuer.phone && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-gray-900">{formData.issuer.phone}</p>
              </div>
            )}
            {formData.issuer.company_website && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Website</p>
                <p className="text-gray-900">{formData.issuer.company_website}</p>
              </div>
            )}
            <div className="md:col-span-2">
              <p className="text-xs text-gray-500 mb-1">Legal Address</p>
              <p className="text-gray-900">
                {formatAddress(formData.issuer.legal_address)}
              </p>
            </div>
            {formData.issuer.contact_address?.street1 && (
              <div className="md:col-span-2">
                <p className="text-xs text-gray-500 mb-1">Contact Address</p>
                <p className="text-gray-900">
                  {formatAddress(formData.issuer.contact_address)}
                </p>
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <div>
            <p className="text-xs text-gray-500 mb-3">Compliance Status</p>
            <div className="flex flex-wrap gap-2">
              {formData.issuer.is_sec_reporting && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">SEC Reporting</span>
              )}
              {formData.issuer.is_shell_issuer && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Shell Issuer</span>
              )}
              {formData.issuer.original_medallion_waiver && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Medallion Waiver</span>
              )}
              {formData.issuer.requires_issuer_approval_for_legal_counsel && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">Requires Counsel Approval</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issue Card */}
      <Card className="border-2 hover:border-blue-300 transition-all">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Briefcase className="size-5 text-purple-600" />
              </div>
              <CardTitle>Issue Information</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Internal ID</p>
              <p className="text-gray-900">{formData.issue.internal_id || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Class Name</p>
              <p className="text-gray-900">{formData.issue.name || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Class Type</p>
              <p className="text-gray-900">{formData.issue.class_type?.replace(/_/g, ' ') || '-'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Class State</p>
              <p className="text-gray-900">{formData.issue.class_state || '-'}</p>
            </div>
            {formData.issue.cusip && (
              <div>
                <p className="text-xs text-gray-500 mb-1">CUSIP</p>
                <p className="text-gray-900">{formData.issue.cusip}</p>
              </div>
            )}
            {formData.issue.isin && (
              <div>
                <p className="text-xs text-gray-500 mb-1">ISIN</p>
                <p className="text-gray-900">{formData.issue.isin}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500 mb-1">Votes Per Share</p>
              <p className="text-gray-900">{formData.issue.votes_per_share || '0'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Initial Shares Authorized</p>
              <p className="text-gray-900">{formData.issue.initial_shares_authorized ? parseFloat(formData.issue.initial_shares_authorized).toLocaleString() : '-'}</p>
            </div>
            {formData.issue.par_value?.amount && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Par Value</p>
                <p className="text-gray-900">{formData.issue.par_value.amount} {formData.issue.par_value.currency}</p>
              </div>
            )}
            {formData.issue.price_per_share?.amount && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Price Per Share</p>
                <p className="text-gray-900">{formData.issue.price_per_share.amount} {formData.issue.price_per_share.currency}</p>
              </div>
            )}
            {formData.issue.authorization_date && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Authorization Date</p>
                <p className="text-gray-900">{formData.issue.authorization_date}</p>
              </div>
            )}
            {formData.issue.board_approval_date && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Board Approval Date</p>
                <p className="text-gray-900">{formData.issue.board_approval_date}</p>
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <div>
            <p className="text-xs text-gray-500 mb-3">Security Features</p>
            <div className="flex flex-wrap gap-2">
              {formData.issue.dtc_eligible && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">DTC Eligible</span>
              )}
              {formData.issue.fast_eligible && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">FAST Eligible</span>
              )}
              {formData.issue.dividend && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Dividend Paying</span>
              )}
              {formData.issue.fractional_shares && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">Fractional Shares</span>
              )}
              {formData.issue.allow_certificates && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">Certificates Allowed</span>
              )}
              {formData.issue.accept_sales && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">Sales Accepted</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Income Summary Card */}
      <Card className="border-2 border-green-200 hover:border-green-300 transition-all">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="size-5 text-green-600" />
              </div>
              <CardTitle>Preferred Information</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.conversion.internal_id && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Internal ID</p>
                <p className="text-gray-900">{formData.conversion.internal_id}</p>
              </div>
            )}
            {formData.conversion.start_date && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Start Date</p>
                <p className="text-gray-900">{formData.conversion.start_date}</p>
              </div>
            )}
            {formData.conversion.maturity_date && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Maturity Date</p>
                <p className="text-gray-900">{formData.conversion.maturity_date}</p>
              </div>
            )}
            {formData.conversion.redemption_date && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Redemption Date</p>
                <p className="text-gray-900">{formData.conversion.redemption_date}</p>
              </div>
            )}
            {formData.conversion.conversion_mechanism_type && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Conversion Mechanism Type</p>
                <p className="text-gray-900">{formData.conversion.conversion_mechanism_type.replace(/_/g, ' ')}</p>
              </div>
            )}
            {formData.conversion.converts_to && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Converts To</p>
                <p className="text-gray-900">{formData.conversion.converts_to}</p>
              </div>
            )}
            {formData.conversion.conversion_calculation && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Conversion Calculation</p>
                <p className="text-gray-900">{formData.conversion.conversion_calculation}</p>
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <div>
            <p className="text-xs text-gray-500 mb-3">Features</p>
            <div className="flex flex-wrap gap-2">
              {formData.conversion.participating && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Participating</span>
              )}
              {formData.conversion.redeemable && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Redeemable</span>
              )}
              {formData.conversion.online_conversions && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Online Conversions</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deductions Summary Card */}
      <Card className="border-2 border-purple-200 hover:border-purple-300 transition-all">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="size-5 text-purple-600" />
              </div>
              <CardTitle>Warrant Information</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.warrant.internal_id && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Internal ID</p>
                <p className="text-gray-900">{formData.warrant.internal_id}</p>
              </div>
            )}
            {formData.warrant.warrant_exercise_terms_price && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Exercise Price</p>
                <p className="text-gray-900">${formData.warrant.warrant_exercise_terms_price}</p>
              </div>
            )}
            {formData.warrant.exercise_ratio && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Exercise Ratio</p>
                <p className="text-gray-900">{formData.warrant.exercise_ratio}</p>
              </div>
            )}
            {formData.warrant.number_of_exercise_terms && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Number of Exercise Terms</p>
                <p className="text-gray-900">{formData.warrant.number_of_exercise_terms}</p>
              </div>
            )}
            {formData.warrant.warrant_exercise_terms_start_date && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Exercise Start Date</p>
                <p className="text-gray-900">{formData.warrant.warrant_exercise_terms_start_date}</p>
              </div>
            )}
            {formData.warrant.warrant_exercise_terms_end_date && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Exercise End Date</p>
                <p className="text-gray-900">{formData.warrant.warrant_exercise_terms_end_date}</p>
              </div>
            )}
            {formData.warrant.expiry_date && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Expiry Date</p>
                <p className="text-gray-900">{formData.warrant.expiry_date}</p>
              </div>
            )}
            {formData.warrant.exercise_to && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Exercise To</p>
                <p className="text-gray-900">{formData.warrant.exercise_to}</p>
              </div>
            )}
          </div>
          
          {formData.warrant.allowed_payment_methods && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-xs text-gray-500 mb-3">Allowed Payment Methods</p>
                <div className="flex flex-wrap gap-2">
                  {formData.warrant.allowed_payment_methods.split(',').map((method, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {method.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {formData.warrant.is_exercisable && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-xs text-gray-500 mb-3">Status</p>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Exercisable</span>
              </div>
            </>
          )}

          {formData.warrant.cheque_payment_delivery_address?.street1 && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-xs text-gray-500 mb-1">Check Payment Delivery Address</p>
                <p className="text-gray-900">{formatAddress(formData.warrant.cheque_payment_delivery_address)}</p>
              </div>
            </>
          )}

          {formData.warrant.wire_transfer_financial_institution_name && (
            <>
              <Separator className="my-4" />
              <div>
                <p className="text-xs text-gray-500 mb-3">Wire Transfer Details</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Financial Institution</p>
                    <p className="text-gray-900">{formData.warrant.wire_transfer_financial_institution_name}</p>
                  </div>
                  {formData.warrant.wire_transfer_financial_institution_swift_bic_code && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">SWIFT/BIC Code</p>
                      <p className="text-gray-900">{formData.warrant.wire_transfer_financial_institution_swift_bic_code}</p>
                    </div>
                  )}
                  {formData.warrant.wire_transfer_aba_number && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">ABA Routing Number</p>
                      <p className="text-gray-900">{formData.warrant.wire_transfer_aba_number}</p>
                    </div>
                  )}
                  {formData.warrant.wire_transfer_chips_number && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">CHIPS Number</p>
                      <p className="text-gray-900">{formData.warrant.wire_transfer_chips_number}</p>
                    </div>
                  )}
                  {formData.warrant.wire_transfer_branch_address?.street1 && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Branch Address</p>
                      <p className="text-gray-900">{formatAddress(formData.warrant.wire_transfer_branch_address)}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Listing Information Card */}
      <Card className="border-2 border-emerald-200 hover:border-emerald-300 transition-all">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <List className="size-5 text-emerald-600" />
              </div>
              <CardTitle>Listing Information</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.listing.internal_id && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Internal ID</p>
                <p className="text-gray-900">{formData.listing.internal_id}</p>
              </div>
            )}
            {formData.listing.ticker && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Ticker Symbol</p>
                <p className="text-gray-900">{formData.listing.ticker}</p>
              </div>
            )}
            {formData.listing.exchange && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Exchange</p>
                <p className="text-gray-900">{formData.listing.exchange}</p>
              </div>
            )}
            {formData.listing.listing_date && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Listing Date</p>
                <p className="text-gray-900">{formData.listing.listing_date}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Issuer Admin Card */}
      <Card className="border-2 border-indigo-200 hover:border-indigo-300 transition-all">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <UserCog className="size-5 text-indigo-600" />
              </div>
              <CardTitle>Issuer Administrator</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Edit className="size-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.issuer_admin.legal_name && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Legal Name</p>
                <p className="text-gray-900">{formData.issuer_admin.legal_name}</p>
              </div>
            )}
            {formData.issuer_admin.email_address && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Email Address</p>
                <p className="text-gray-900">{formData.issuer_admin.email_address}</p>
              </div>
            )}
            {formData.issuer_admin.job_title && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Job Title</p>
                <p className="text-gray-900">{formData.issuer_admin.job_title}</p>
              </div>
            )}
          </div>
          <Separator className="my-4" />
          <div>
            <p className="text-xs text-gray-500 mb-3">Roles & Permissions</p>
            <div className="flex flex-wrap gap-2">
              {formData.issuer_admin.admin && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">Administrator</span>
              )}
              {formData.issuer_admin.director && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Director</span>
              )}
              {formData.issuer_admin.authorized_officer && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Authorized Officer</span>
              )}
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <p className="text-xs text-gray-500 mb-3">Compliance Status</p>
            <div className="flex flex-wrap gap-2">
              {formData.issuer_admin.on_certificate_of_incumbency && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">On Certificate of Incumbency</span>
              )}
              {formData.issuer_admin.kyc_complete && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">KYC Complete</span>
              )}
              {formData.issuer_admin.authenticated_email && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">Email Authenticated</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Confirmation */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <CheckCircle2 className="size-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-green-900 mb-3">Ready to Submit Your Application</h4>
            <div className="space-y-2 text-sm text-green-800">
              <p>✓ All required information has been collected</p>
              <p>✓ Your data is encrypted and secure</p>
              <p>✓ You can download a copy for your records</p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                By clicking "Submit Application" below, I certify that the information provided is accurate and complete to the best of my knowledge. I understand that providing false information may result in penalties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}