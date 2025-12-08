import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { List, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ListingInfoData {
  internal_id: string;
  ticker: string;
  exchange: string;
  listing_date: string;
}

interface ListingInfoProps {
  data: ListingInfoData;
  onUpdate: (data: ListingInfoData) => void;
}

export function ListingInfo({ data, onUpdate }: ListingInfoProps) {
  const handleChange = (field: keyof ListingInfoData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-6">
        <div className="flex gap-3">
          <div className="size-10 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <List className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">Listing Information</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Provide details about where this security is listed and traded. Include exchange information and listing dates.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <h3 className="text-gray-900 mb-6">Listing Details</h3>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="internal_id" className="text-gray-700">
              Internal ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="internal_id"
              value={data.internal_id}
              onChange={(e) => handleChange('internal_id', e.target.value)}
              placeholder="LIST-001"
              className="h-11"
            />
            <p className="text-xs text-gray-500">Unique identifier for this listing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="ticker" className="text-gray-700">
                  Ticker Symbol <span className="text-red-500">*</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Trading symbol used to identify this security on the exchange</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="ticker"
                value={data.ticker}
                onChange={(e) => handleChange('ticker', e.target.value.toUpperCase())}
                placeholder="ACME"
                className="h-11"
                maxLength={10}
              />
              <p className="text-xs text-gray-500">Trading symbol (e.g., AAPL, TSLA)</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="exchange" className="text-gray-700">
                  Exchange <span className="text-red-500">*</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Stock exchange where the security is listed (e.g., NYSE, NASDAQ)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="exchange"
                value={data.exchange}
                onChange={(e) => handleChange('exchange', e.target.value)}
                placeholder="NYSE"
                className="h-11"
              />
              <p className="text-xs text-gray-500">Exchange name (e.g., NYSE, NASDAQ, LSE)</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="listing_date" className="text-gray-700">
              Listing Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="listing_date"
              type="date"
              value={data.listing_date}
              onChange={(e) => handleChange('listing_date', e.target.value)}
              className="h-11"
            />
            <p className="text-xs text-gray-500">Date when the security was first listed on the exchange</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.ticker && data.exchange && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-emerald-100 text-sm mb-2">Listing Summary</p>
              <div className="space-y-2">
                <p className="text-lg">
                  <span className="font-mono">{data.ticker}</span> listed on <span className="font-mono">{data.exchange}</span>
                </p>
                {data.listing_date && (
                  <p className="text-emerald-100">
                    Listed since: {new Date(data.listing_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
            <div className="size-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <List className="size-7" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
