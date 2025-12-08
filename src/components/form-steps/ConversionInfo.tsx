import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { RefreshCw, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface PreferredInfoData {
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
}

interface PreferredInfoProps {
  data: PreferredInfoData;
  onUpdate: (data: PreferredInfoData) => void;
}

export function PreferredInfo({ data, onUpdate }: PreferredInfoProps) {
  const handleChange = (field: keyof PreferredInfoData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl p-6">
        <div className="flex gap-3">
          <div className="size-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <RefreshCw className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">Conversion & Redemption Mechanisms</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Define conversion rights, redemption terms, and maturity dates for this security. These settings determine how and when securities can be converted or redeemed.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <h3 className="text-gray-900 mb-6">Basic Details</h3>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="internal_id" className="text-gray-700">
              Internal ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="internal_id"
              value={data.internal_id}
              onChange={(e) => handleChange('internal_id', e.target.value)}
              placeholder="CONV-001"
              className="h-11"
            />
            <p className="text-xs text-gray-500">Unique identifier for this conversion mechanism</p>
          </div>

          <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
            <Checkbox
              id="participating"
              checked={data.participating}
              onCheckedChange={(checked) => handleChange('participating', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="participating" className="text-gray-900 cursor-pointer">
                  Participating Security
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Participating securities receive dividends and share in additional distributions</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-500 mt-1">Security participates in dividends and distributions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Important Dates</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="start_date" className="text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="start_date"
                type="date"
                value={data.start_date}
                onChange={(e) => handleChange('start_date', e.target.value)}
                className="h-11"
              />
              <p className="text-xs text-gray-500">When conversion rights become active</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maturity_date" className="text-gray-700">
                Maturity Date
              </Label>
              <Input
                id="maturity_date"
                type="date"
                value={data.maturity_date}
                onChange={(e) => handleChange('maturity_date', e.target.value)}
                className="h-11"
              />
              <p className="text-xs text-gray-500">When the security matures (optional)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Redemption */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Redemption Terms</h3>
        
        <div className="space-y-5">
          <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
            <Checkbox
              id="redeemable"
              checked={data.redeemable}
              onCheckedChange={(checked) => handleChange('redeemable', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="redeemable" className="text-gray-900 cursor-pointer">
                  Redeemable Security
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Allows the issuer to buy back the security at a specified date and price</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-500 mt-1">This security can be redeemed by the issuer</p>
            </div>
          </div>

          {data.redeemable && (
            <div className="ml-8 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label htmlFor="redemption_date" className="text-gray-700">
                Redemption Date
              </Label>
              <Input
                id="redemption_date"
                type="date"
                value={data.redemption_date}
                onChange={(e) => handleChange('redemption_date', e.target.value)}
                className="h-11"
              />
              <p className="text-xs text-gray-500">Earliest date when redemption can occur</p>
            </div>
          )}
        </div>
      </div>

      {/* Conversion Mechanism */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Conversion Mechanism</h3>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="conversion_mechanism_type" className="text-gray-700">
              Conversion Mechanism Type
            </Label>
            <Select value={data.conversion_mechanism_type} onValueChange={(value) => handleChange('conversion_mechanism_type', value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select conversion type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RATIO_CONVERSION">
                  <div className="py-1">
                    <div>Ratio Conversion</div>
                    <div className="text-xs text-gray-500">Convert at a fixed ratio</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Method used to calculate conversions</p>
          </div>

          {data.conversion_mechanism_type && (
            <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="converts_to" className="text-gray-700">
                    Converts To (Issue Internal ID)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="size-4 text-gray-400 hover:text-gray-600">
                          <Info className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm max-w-xs">Internal ID of the security class this converts into</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="converts_to"
                  value={data.converts_to}
                  onChange={(e) => handleChange('converts_to', e.target.value)}
                  placeholder="COMMON-001"
                  className="h-11"
                />
                <p className="text-xs text-gray-500">Target security's internal ID from Issue table</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="conversion_calculation" className="text-gray-700">
                    Conversion Calculation
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="size-4 text-gray-400 hover:text-gray-600">
                          <Info className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm max-w-xs">Conversion ratio or formula (e.g., "1:10" means 1 share converts to 10)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="conversion_calculation"
                  value={data.conversion_calculation}
                  onChange={(e) => handleChange('conversion_calculation', e.target.value)}
                  placeholder="1.5 or 1:10"
                  className="h-11"
                />
                <p className="text-xs text-gray-500">Ratio or multiplier for conversion (e.g., 1.5, 1:10)</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Online Conversions */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Conversion Options</h3>
        
        <div className="space-y-5">
          <div className="flex items-start space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
            <Checkbox
              id="online_conversions"
              checked={data.online_conversions}
              onCheckedChange={(checked) => handleChange('online_conversions', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="online_conversions" className="text-gray-900 cursor-pointer">
                  Enable Online Conversions
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Allow shareholders to initiate conversions through online portal</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-600 mt-1">Allow shareholders to convert their securities online without manual intervention</p>
            </div>
          </div>

          {!data.online_conversions && data.conversion_mechanism_type && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 animate-in fade-in duration-200">
              <div className="flex gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="text-sm text-amber-900 leading-relaxed">
                    <strong>Manual Approval Required:</strong> With online conversions disabled, all conversion requests will require manual review and approval by the issuer.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.conversion_mechanism_type && data.converts_to && (
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-cyan-100 text-sm mb-2">Conversion Summary</p>
              <div className="space-y-2">
                <p className="text-lg">
                  This security converts to: <span className="font-mono">{data.converts_to}</span>
                </p>
                {data.conversion_calculation && (
                  <p className="text-cyan-100">
                    Conversion ratio: {data.conversion_calculation}
                  </p>
                )}
                <p className="text-cyan-100 text-sm">
                  Method: {data.conversion_mechanism_type.replace(/_/g, ' ')}
                </p>
              </div>
            </div>
            <div className="size-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <RefreshCw className="size-7" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}