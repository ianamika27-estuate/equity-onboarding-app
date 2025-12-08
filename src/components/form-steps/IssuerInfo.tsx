import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Building2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { StructuredMailingAddress } from '../../App';

interface IssuerInfoData {
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
}

interface IssuerInfoProps {
  data: IssuerInfoData;
  onUpdate: (data: IssuerInfoData) => void;
}

export function IssuerInfo({ data, onUpdate }: IssuerInfoProps) {
  const handleChange = (field: keyof IssuerInfoData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const handleAddressChange = (
    addressType: 'legal_address' | 'contact_address',
    field: keyof StructuredMailingAddress,
    value: string
  ) => {
    onUpdate({
      ...data,
      [addressType]: {
        ...data[addressType],
        [field]: value,
      },
    });
  };

  const handleTaxIdChange = (field: 'tax_id' | 'country', value: string) => {
    onUpdate({
      ...data,
      tax_ids: {
        ...data.tax_ids,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
        <div className="flex gap-3">
          <div className="size-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">Issuer Information</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Provide accurate company details for regulatory compliance and SEC reporting requirements. All information is encrypted and kept confidential.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Company Information */}
      <div>
        <h3 className="text-gray-900 mb-6">Company Details</h3>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="legal_name" className="text-gray-700">
              Legal Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="legal_name"
              value={data.legal_name}
              onChange={(e) => handleChange('legal_name', e.target.value)}
              placeholder="Acme Corporation Inc."
              className="h-11"
            />
            <p className="text-xs text-gray-500">Official registered company name</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dba" className="text-gray-700">
              DBA (Doing Business As)
            </Label>
            <Input
              id="dba"
              value={data.dba}
              onChange={(e) => handleChange('dba', e.target.value)}
              placeholder="Acme Tech"
              className="h-11"
            />
            <p className="text-xs text-gray-500">Optional trade name or DBA</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="organization_type" className="text-gray-700">
                Organization Type <span className="text-red-500">*</span>
              </Label>
              <Select value={data.organization_type} onValueChange={(value) => handleChange('organization_type', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CORPORATION">Corporation</SelectItem>
                  <SelectItem value="LIMITED_PARTNERSHIP">Limited Partnership</SelectItem>
                  <SelectItem value="LIMITED_LIABILITY_CORPORATION">Limited Liability Corporation (LLC)</SelectItem>
                  <SelectItem value="NON_US_ENTITY">Non-US Entity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="central_index_key" className="text-gray-700">
                Central Index Key (CIK) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="central_index_key"
                value={data.central_index_key}
                onChange={(e) => handleChange('central_index_key', e.target.value)}
                placeholder="0001234567"
                className="h-11"
              />
              <p className="text-xs text-gray-500">SEC Central Index Key</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formation Details */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Formation Details</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label htmlFor="country_of_formation" className="text-gray-700">
                Country of Formation <span className="text-red-500">*</span>
              </Label>
              <Input
                id="country_of_formation"
                value={data.country_of_formation}
                onChange={(e) => handleChange('country_of_formation', e.target.value.toUpperCase())}
                placeholder="US"
                maxLength={2}
                className="h-11 uppercase"
              />
              <p className="text-xs text-gray-500">2-digit ISO code</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country_subdivision_of_formation" className="text-gray-700">
                State/Province
              </Label>
              <Input
                id="country_subdivision_of_formation"
                value={data.country_subdivision_of_formation}
                onChange={(e) => handleChange('country_subdivision_of_formation', e.target.value.toUpperCase())}
                placeholder="DE"
                maxLength={2}
                className="h-11 uppercase"
              />
              <p className="text-xs text-gray-500">2-digit state code</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="formation_date" className="text-gray-700">
                Formation Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="formation_date"
                type="date"
                value={data.formation_date}
                onChange={(e) => handleChange('formation_date', e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="active_date" className="text-gray-700">
                Active Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="active_date"
                type="date"
                value={data.active_date}
                onChange={(e) => handleChange('active_date', e.target.value)}
                className="h-11"
              />
              <p className="text-xs text-gray-500">Date company became active</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year_end" className="text-gray-700">
                Fiscal Year End <span className="text-red-500">*</span>
              </Label>
              <Input
                id="year_end"
                value={data.year_end}
                onChange={(e) => handleChange('year_end', e.target.value)}
                placeholder="December 31"
                className="h-11"
              />
              <p className="text-xs text-gray-500">e.g., December 31</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Information */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Tax Information</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="tax_id" className="text-gray-700">
                  Tax ID / EIN
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Format: 12-3456789</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="tax_id"
                value={data.tax_ids.tax_id}
                onChange={(e) => handleTaxIdChange('tax_id', e.target.value)}
                placeholder="12-3456789"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax_country" className="text-gray-700">
                Tax ID Country
              </Label>
              <Input
                id="tax_country"
                value={data.tax_ids.country}
                onChange={(e) => handleTaxIdChange('country', e.target.value.toUpperCase())}
                placeholder="US"
                maxLength={2}
                className="h-11 uppercase"
              />
              <p className="text-xs text-gray-500">2-digit ISO code</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Address */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Legal Address</h3>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="legal_street1" className="text-gray-700">
              Street Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="legal_street1"
              value={data.legal_address.street1}
              onChange={(e) => handleAddressChange('legal_address', 'street1', e.target.value)}
              placeholder="123 Main Street"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="legal_street2" className="text-gray-700">
              Street Address Line 2
            </Label>
            <Input
              id="legal_street2"
              value={data.legal_address.street2}
              onChange={(e) => handleAddressChange('legal_address', 'street2', e.target.value)}
              placeholder="Suite 100"
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="legal_city" className="text-gray-700">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="legal_city"
                value={data.legal_address.city}
                onChange={(e) => handleAddressChange('legal_address', 'city', e.target.value)}
                placeholder="Wilmington"
                className="h-11"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="legal_state" className="text-gray-700">
                State <span className="text-red-500">*</span>
              </Label>
              <Input
                id="legal_state"
                value={data.legal_address.state}
                onChange={(e) => handleAddressChange('legal_address', 'state', e.target.value.toUpperCase())}
                placeholder="DE"
                maxLength={2}
                className="h-11 uppercase"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="legal_postal" className="text-gray-700">
                Postal Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="legal_postal"
                value={data.legal_address.postalCode}
                onChange={(e) => handleAddressChange('legal_address', 'postalCode', e.target.value)}
                placeholder="19801"
                className="h-11"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="legal_country" className="text-gray-700">
                Country <span className="text-red-500">*</span>
              </Label>
              <Input
                id="legal_country"
                value={data.legal_address.country}
                onChange={(e) => handleAddressChange('legal_address', 'country', e.target.value.toUpperCase())}
                placeholder="US"
                maxLength={2}
                className="h-11 uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Address */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Contact Address (Optional)</h3>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="contact_street1" className="text-gray-700">
              Street Address
            </Label>
            <Input
              id="contact_street1"
              value={data.contact_address.street1}
              onChange={(e) => handleAddressChange('contact_address', 'street1', e.target.value)}
              placeholder="456 Business Blvd"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_street2" className="text-gray-700">
              Street Address Line 2
            </Label>
            <Input
              id="contact_street2"
              value={data.contact_address.street2}
              onChange={(e) => handleAddressChange('contact_address', 'street2', e.target.value)}
              placeholder="Floor 5"
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contact_city" className="text-gray-700">
                City
              </Label>
              <Input
                id="contact_city"
                value={data.contact_address.city}
                onChange={(e) => handleAddressChange('contact_address', 'city', e.target.value)}
                placeholder="New York"
                className="h-11"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="contact_state" className="text-gray-700">
                State
              </Label>
              <Input
                id="contact_state"
                value={data.contact_address.state}
                onChange={(e) => handleAddressChange('contact_address', 'state', e.target.value.toUpperCase())}
                placeholder="NY"
                maxLength={2}
                className="h-11 uppercase"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contact_postal" className="text-gray-700">
                Postal Code
              </Label>
              <Input
                id="contact_postal"
                value={data.contact_address.postalCode}
                onChange={(e) => handleAddressChange('contact_address', 'postalCode', e.target.value)}
                placeholder="10001"
                className="h-11"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="contact_country" className="text-gray-700">
                Country
              </Label>
              <Input
                id="contact_country"
                value={data.contact_address.country}
                onChange={(e) => handleAddressChange('contact_address', 'country', e.target.value.toUpperCase())}
                placeholder="US"
                maxLength={2}
                className="h-11 uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Contact Information</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@acmecorp.com"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_website" className="text-gray-700">
                Company Website
              </Label>
              <Input
                id="company_website"
                type="url"
                value={data.company_website}
                onChange={(e) => handleChange('company_website', e.target.value)}
                placeholder="https://acmecorp.com"
                className="h-11"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Regulatory */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Compliance & Regulatory</h3>
        
        <div className="space-y-5">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="is_sec_reporting"
                checked={data.is_sec_reporting}
                onCheckedChange={(checked) => handleChange('is_sec_reporting', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="is_sec_reporting" className="text-gray-900 cursor-pointer">
                  SEC Reporting Company
                </Label>
                <p className="text-xs text-gray-500 mt-1">Company files regular reports with the SEC</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="is_shell_issuer"
                checked={data.is_shell_issuer}
                onCheckedChange={(checked) => handleChange('is_shell_issuer', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="is_shell_issuer" className="text-gray-900 cursor-pointer">
                  Shell Company
                </Label>
                <p className="text-xs text-gray-500 mt-1">Company with no or nominal operations</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="original_medallion_waiver"
                checked={data.original_medallion_waiver}
                onCheckedChange={(checked) => handleChange('original_medallion_waiver', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="original_medallion_waiver" className="text-gray-900 cursor-pointer">
                  Original Medallion Waiver
                </Label>
                <p className="text-xs text-gray-500 mt-1">Waives medallion guarantee requirement</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="requires_issuer_approval_for_legal_counsel"
                checked={data.requires_issuer_approval_for_legal_counsel}
                onCheckedChange={(checked) => handleChange('requires_issuer_approval_for_legal_counsel', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="requires_issuer_approval_for_legal_counsel" className="text-gray-900 cursor-pointer">
                  Requires Issuer Approval for Legal Counsel
                </Label>
                <p className="text-xs text-gray-500 mt-1">Controls RO legend removal and DWAC flow</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div className="space-y-2">
              <Label htmlFor="quorum_requirement" className="text-gray-700">
                Quorum Requirement <span className="text-red-500">*</span>
              </Label>
              <Input
                id="quorum_requirement"
                value={data.quorum_requirement}
                onChange={(e) => handleChange('quorum_requirement', e.target.value)}
                placeholder="Majority of outstanding shares"
                className="h-11"
              />
              <p className="text-xs text-gray-500">Minimum attendance for shareholder meetings</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="drs_payment_fee" className="text-gray-700">
                DRS Payment Fee <span className="text-red-500">*</span>
              </Label>
              <Input
                id="drs_payment_fee"
                type="number"
                value={data.drs_payment_fee}
                onChange={(e) => handleChange('drs_payment_fee', e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="h-11"
              />
              <p className="text-xs text-gray-500">Fee for Direct Registration System transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
