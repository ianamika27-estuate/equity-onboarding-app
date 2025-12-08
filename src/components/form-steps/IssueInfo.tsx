import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { FileText, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface IssueInfoData {
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
}

interface IssueInfoProps {
  data: IssueInfoData;
  onUpdate: (data: IssueInfoData) => void;
}

export function IssueInfo({ data, onUpdate }: IssueInfoProps) {
  const handleChange = (field: keyof IssueInfoData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const handleParValueChange = (field: 'amount' | 'currency', value: string) => {
    onUpdate({
      ...data,
      par_value: {
        ...data.par_value,
        [field]: value,
      },
    });
  };

  const handlePricePerShareChange = (field: 'amount' | 'currency', value: string) => {
    onUpdate({
      ...data,
      price_per_share: {
        ...data.price_per_share,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-6">
        <div className="flex gap-3">
          <div className="size-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">Security Class Information</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Define the characteristics and properties of this security class. This information is critical for regulatory compliance and shareholder management.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Issue Information */}
      <div>
        <h3 className="text-gray-900 mb-6">Basic Details</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="internal_id" className="text-gray-700">
                Internal ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="internal_id"
                value={data.internal_id}
                onChange={(e) => handleChange('internal_id', e.target.value)}
                placeholder="COMMON-001"
                className="h-11"
              />
              <p className="text-xs text-gray-500">Unique internal identifier for this security class</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700">
                Class Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Common Stock Class A"
                className="h-11"
              />
              <p className="text-xs text-gray-500">Descriptive name for this security class</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="class_type" className="text-gray-700">
                Class Type <span className="text-red-500">*</span>
              </Label>
              <Select value={data.class_type} onValueChange={(value) => handleChange('class_type', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select class type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COMMON">Common Stock</SelectItem>
                  <SelectItem value="PREFERRED">Preferred Stock</SelectItem>
                  <SelectItem value="WARRANTS">Warrants</SelectItem>
                  <SelectItem value="RIGHTS">Rights</SelectItem>
                  <SelectItem value="NOTES">Notes</SelectItem>
                  <SelectItem value="DEBENTURES">Debentures</SelectItem>
                  <SelectItem value="BONDS">Bonds</SelectItem>
                  <SelectItem value="SAFES">SAFEs</SelectItem>
                  <SelectItem value="SUBSCRIPTION_RECEIPT">Subscription Receipt</SelectItem>
                  <SelectItem value="UNITS">Units</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="class_state" className="text-gray-700">
                Class State <span className="text-red-500">*</span>
              </Label>
              <Select value={data.class_state} onValueChange={(value) => handleChange('class_state', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select class state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="PREDECESSOR">Predecessor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Identifiers */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Security Identifiers</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="cusip" className="text-gray-700">
                  CUSIP
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Committee on Uniform Securities Identification Procedures number</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="cusip"
                value={data.cusip}
                onChange={(e) => handleChange('cusip', e.target.value)}
                placeholder="037833100"
                className="h-11"
              />
              <p className="text-xs text-gray-500">9-character alphanumeric identifier</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="isin" className="text-gray-700">
                  ISIN
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">International Securities Identification Number</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="isin"
                value={data.isin}
                onChange={(e) => handleChange('isin', e.target.value)}
                placeholder="US0378331005"
                className="h-11"
              />
              <p className="text-xs text-gray-500">12-character alphanumeric identifier</p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility & Dates */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Eligibility & Important Dates</h3>
        
        <div className="space-y-5">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="dtc_eligible"
                checked={data.dtc_eligible}
                onCheckedChange={(checked) => handleChange('dtc_eligible', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="dtc_eligible" className="text-gray-900 cursor-pointer">
                  DTC Eligible
                </Label>
                <p className="text-xs text-gray-500 mt-1">Eligible for Depository Trust Company services</p>
              </div>
            </div>

            {data.dtc_eligible && (
              <div className="ml-8 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <Label htmlFor="dtc_eligibility_change_date" className="text-gray-700">
                  DTC Eligibility Change Date
                </Label>
                <Input
                  id="dtc_eligibility_change_date"
                  type="date"
                  value={data.dtc_eligibility_change_date}
                  onChange={(e) => handleChange('dtc_eligibility_change_date', e.target.value)}
                  className="h-11"
                />
              </div>
            )}

            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="fast_eligible"
                checked={data.fast_eligible}
                onCheckedChange={(checked) => handleChange('fast_eligible', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="fast_eligible" className="text-gray-900 cursor-pointer">
                  FAST Eligible
                </Label>
                <p className="text-xs text-gray-500 mt-1">Fast Automated Securities Transfer eligible</p>
              </div>
            </div>

            {data.fast_eligible && (
              <div className="ml-8 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <Label htmlFor="fast_eligibility_change_date" className="text-gray-700">
                  FAST Eligibility Change Date
                </Label>
                <Input
                  id="fast_eligibility_change_date"
                  type="date"
                  value={data.fast_eligibility_change_date}
                  onChange={(e) => handleChange('fast_eligibility_change_date', e.target.value)}
                  className="h-11"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div className="space-y-2">
              <Label htmlFor="board_approval_date" className="text-gray-700">
                Board Approval Date
              </Label>
              <Input
                id="board_approval_date"
                type="date"
                value={data.board_approval_date}
                onChange={(e) => handleChange('board_approval_date', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="authorization_date" className="text-gray-700">
                Authorization Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="authorization_date"
                type="date"
                value={data.authorization_date}
                onChange={(e) => handleChange('authorization_date', e.target.value)}
                className="h-11"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Voting & Dividend */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Voting Rights & Dividends</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="votes_per_share" className="text-gray-700">
                Votes Per Share <span className="text-red-500">*</span>
              </Label>
              <Input
                id="votes_per_share"
                type="number"
                value={data.votes_per_share}
                onChange={(e) => handleChange('votes_per_share', e.target.value)}
                placeholder="1"
                step="0.01"
                className="h-11"
              />
              <p className="text-xs text-gray-500">Number of votes each share carries</p>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Dividend Paying</Label>
              <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg h-11">
                <Checkbox
                  id="dividend"
                  checked={data.dividend}
                  onCheckedChange={(checked) => handleChange('dividend', checked)}
                />
                <Label htmlFor="dividend" className="text-gray-900 cursor-pointer">
                  This security pays dividends
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Valuation */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Pricing & Valuation</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="par_value_amount" className="text-gray-700">
                Par Value
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Input
                    id="par_value_amount"
                    type="number"
                    value={data.par_value.amount}
                    onChange={(e) => handleParValueChange('amount', e.target.value)}
                    placeholder="0.001"
                    step="0.001"
                    className="h-11"
                  />
                </div>
                <Select value={data.par_value.currency} onValueChange={(value) => handleParValueChange('currency', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-500">Nominal value per share</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price_per_share_amount" className="text-gray-700">
                Price Per Share
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Input
                    id="price_per_share_amount"
                    type="number"
                    value={data.price_per_share.amount}
                    onChange={(e) => handlePricePerShareChange('amount', e.target.value)}
                    placeholder="10.00"
                    step="0.01"
                    className="h-11"
                  />
                </div>
                <Select value={data.price_per_share.currency} onValueChange={(value) => handlePricePerShareChange('currency', value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-gray-500">Current or offering price</p>
            </div>
          </div>
        </div>
      </div>

      {/* Share Authorization & Trading */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Share Authorization & Trading</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="initial_shares_authorized" className="text-gray-700">
                Initial Shares Authorized <span className="text-red-500">*</span>
              </Label>
              <Input
                id="initial_shares_authorized"
                type="number"
                value={data.initial_shares_authorized}
                onChange={(e) => handleChange('initial_shares_authorized', e.target.value)}
                placeholder="10000000"
                className="h-11"
              />
              <p className="text-xs text-gray-500">Total number of shares authorized</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allowable_decimals" className="text-gray-700">
                Allowable Decimals <span className="text-red-500">*</span>
              </Label>
              <Input
                id="allowable_decimals"
                type="number"
                value={data.allowable_decimals}
                onChange={(e) => handleChange('allowable_decimals', e.target.value)}
                placeholder="4"
                min="0"
                max="8"
                className="h-11"
              />
              <p className="text-xs text-gray-500">Decimal places allowed for shares (0-8)</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="accept_sales"
                checked={data.accept_sales}
                onCheckedChange={(checked) => handleChange('accept_sales', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="accept_sales" className="text-gray-900 cursor-pointer">
                  Accept Sales
                </Label>
                <p className="text-xs text-gray-500 mt-1">Allow sales/transfers of this security</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="fractional_shares"
                checked={data.fractional_shares}
                onCheckedChange={(checked) => handleChange('fractional_shares', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="fractional_shares" className="text-gray-900 cursor-pointer">
                  Allow Fractional Shares
                </Label>
                <p className="text-xs text-gray-500 mt-1">Enable ownership of fractional shares</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <Checkbox
                id="allow_certificates"
                checked={data.allow_certificates}
                onCheckedChange={(checked) => handleChange('allow_certificates', checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="allow_certificates" className="text-gray-900 cursor-pointer">
                  Allow Physical Certificates
                </Label>
                <p className="text-xs text-gray-500 mt-1">Permit issuance of physical stock certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
