import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { UserCog, Info, ShieldCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface IssuerAdminInfoData {
  legal_name: string;
  email_address: string;
  job_title: string;
  admin: boolean;
  director: boolean;
  authorized_officer: boolean;
  on_certificate_of_incumbency: boolean;
  kyc_complete: boolean;
  authenticated_email: boolean;
}

interface IssuerAdminInfoProps {
  data: IssuerAdminInfoData;
  onUpdate: (data: IssuerAdminInfoData) => void;
}

export function IssuerAdminInfo({ data, onUpdate }: IssuerAdminInfoProps) {
  const handleChange = (field: keyof IssuerAdminInfoData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const roleCount = [data.admin, data.director, data.authorized_officer].filter(Boolean).length;
  const complianceCount = [data.on_certificate_of_incumbency, data.kyc_complete, data.authenticated_email].filter(Boolean).length;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6">
        <div className="flex gap-3">
          <div className="size-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <UserCog className="size-5 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-2">Issuer Administrator</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Provide information about the authorized administrator for this issuer. This person will have administrative access and signing authority.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <h3 className="text-gray-900 mb-6">Administrator Details</h3>
        
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="legal_name" className="text-gray-700">
              Legal Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="legal_name"
              value={data.legal_name}
              onChange={(e) => handleChange('legal_name', e.target.value)}
              placeholder="John Smith"
              className="h-11"
            />
            <p className="text-xs text-gray-500">Full legal name as it appears on official documents</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email_address" className="text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email_address"
              type="email"
              value={data.email_address}
              onChange={(e) => handleChange('email_address', e.target.value)}
              placeholder="john.smith@company.com"
              className="h-11"
            />
            <p className="text-xs text-gray-500">Primary email address for administrative communications</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_title" className="text-gray-700">
              Job Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="job_title"
              value={data.job_title}
              onChange={(e) => handleChange('job_title', e.target.value)}
              placeholder="Chief Financial Officer"
              className="h-11"
            />
            <p className="text-xs text-gray-500">Current position or title at the company</p>
          </div>
        </div>
      </div>

      {/* Roles & Permissions */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Roles & Permissions</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
            <Checkbox
              id="admin"
              checked={data.admin}
              onCheckedChange={(checked) => handleChange('admin', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="admin" className="text-gray-900 cursor-pointer">
                  Administrator
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Has full administrative access to the system</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-500 mt-1">Full administrative access and permissions</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
            <Checkbox
              id="director"
              checked={data.director}
              onCheckedChange={(checked) => handleChange('director', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="director" className="text-gray-900 cursor-pointer">
                  Director
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Member of the board of directors</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-500 mt-1">Serves on the board of directors</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
            <Checkbox
              id="authorized_officer"
              checked={data.authorized_officer}
              onCheckedChange={(checked) => handleChange('authorized_officer', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="authorized_officer" className="text-gray-900 cursor-pointer">
                  Authorized Officer
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Authorized to sign legal documents on behalf of the company</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-500 mt-1">Authorized to execute legal documents and agreements</p>
            </div>
          </div>
        </div>

        {roleCount > 0 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <ShieldCheck className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900">
                  <strong>{roleCount}</strong> {roleCount === 1 ? 'role' : 'roles'} assigned
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compliance Status */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-gray-900 mb-6">Compliance Status</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <Checkbox
              id="on_certificate_of_incumbency"
              checked={data.on_certificate_of_incumbency}
              onCheckedChange={(checked) => handleChange('on_certificate_of_incumbency', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="on_certificate_of_incumbency" className="text-gray-900 cursor-pointer">
                  On Certificate of Incumbency
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Listed on the company&apos;s official certificate of incumbency</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-600 mt-1">Listed on official certificate of incumbency</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
            <Checkbox
              id="kyc_complete"
              checked={data.kyc_complete}
              onCheckedChange={(checked) => handleChange('kyc_complete', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="kyc_complete" className="text-gray-900 cursor-pointer">
                  KYC Complete
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Know Your Customer verification has been completed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-600 mt-1">Know Your Customer (KYC) verification completed</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
            <Checkbox
              id="authenticated_email"
              checked={data.authenticated_email}
              onCheckedChange={(checked) => handleChange('authenticated_email', checked)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="authenticated_email" className="text-gray-900 cursor-pointer">
                  Authenticated Email
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="size-4 text-gray-400 hover:text-gray-600">
                        <Info className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">Email address has been verified and authenticated</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs text-gray-600 mt-1">Email address verified and authenticated</p>
            </div>
          </div>
        </div>

        {complianceCount === 3 && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="text-xl">✓</span>
              <div>
                <p className="text-sm text-green-900">
                  <strong>Fully Compliant:</strong> All compliance requirements have been met.
                </p>
              </div>
            </div>
          </div>
        )}

        {complianceCount > 0 && complianceCount < 3 && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="text-sm text-amber-900">
                  <strong>Partial Compliance:</strong> {complianceCount} of 3 compliance requirements completed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {data.legal_name && data.email_address && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-indigo-100 text-sm mb-2">Administrator Summary</p>
              <div className="space-y-2">
                <p className="text-lg">
                  {data.legal_name}
                </p>
                {data.job_title && (
                  <p className="text-indigo-100">
                    {data.job_title}
                  </p>
                )}
                <p className="text-indigo-100 text-sm">
                  {data.email_address}
                </p>
              </div>
            </div>
            <div className="size-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <UserCog className="size-7" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
