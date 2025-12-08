import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface PersonalInfoProps {
  data: PersonalInfoData;
  onUpdate: (data: PersonalInfoData) => void;
}

export function PersonalInfo({ data, onUpdate }: PersonalInfoProps) {
  const handleChange = (field: keyof PersonalInfoData, value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
        <div className="flex gap-3">
          <div className="size-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Info className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">Why we need this information</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We collect your personal details to accurately prepare your tax return and ensure compliance with IRS requirements. All information is encrypted and kept confidential.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-gray-900 mb-6">Basic Information</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={data.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="John"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                value={data.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Doe"
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john.doe@example.com"
                className="h-11"
              />
              <p className="text-xs text-gray-500">We'll send your tax documents here</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="h-11"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Tax Information</h3>
        
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="ssn" className="text-gray-700">
                  Social Security Number <span className="text-red-500">*</span>
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Required for tax filing. Your SSN is encrypted and secure.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="ssn"
                type="password"
                value={data.ssn}
                onChange={(e) => handleChange('ssn', e.target.value)}
                placeholder="XXX-XX-XXXX"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-gray-700">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className="h-11"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Residential Address</h3>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-700">
              Street Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              value={data.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="123 Main Street, Apt 4B"
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="city" className="text-gray-700">
                City <span className="text-red-500">*</span>
              </Label>
              <Input
                id="city"
                value={data.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="New York"
                className="h-11"
              />
            </div>
            <div className="space-y-2 md:col-span-1">
              <Label htmlFor="state" className="text-gray-700">
                State <span className="text-red-500">*</span>
              </Label>
              <Input
                id="state"
                value={data.state}
                onChange={(e) => handleChange('state', e.target.value.toUpperCase())}
                placeholder="NY"
                maxLength={2}
                className="h-11 uppercase"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="zip" className="text-gray-700">
                ZIP Code <span className="text-red-500">*</span>
              </Label>
              <Input
                id="zip"
                value={data.zip}
                onChange={(e) => handleChange('zip', e.target.value)}
                placeholder="10001"
                maxLength={5}
                className="h-11"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
