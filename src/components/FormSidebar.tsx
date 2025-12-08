import { Check, Clock, ChevronRight } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface FormSidebarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (index: number) => void;
  lastSaved: Date | null;
}

export function FormSidebar({ steps, currentStep, onStepClick, lastSaved }: FormSidebarProps) {
  const formatLastSaved = (date: Date | null) => {
    if (!date) return null;
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="hidden lg:block fixed left-0 top-0 h-screen w-80 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-y-auto">
      <div className="p-8">
        {/* Logo/Brand */}
        <div className="mb-12">
          <div className="size-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
            <span className="text-2xl">📊</span>
          </div>
          <h2 className="text-white mb-2">TaxPro</h2>
          <p className="text-blue-200">Financial Onboarding</p>
        </div>

        {/* Steps Navigation */}
        <nav className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isAccessible = index <= currentStep;

            return (
              <button
                key={step.id}
                onClick={() => isAccessible && onStepClick(index)}
                disabled={!isAccessible}
                className={`w-full text-left transition-all duration-200 ${
                  isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                <div
                  className={`p-4 rounded-xl transition-all relative ${
                    isCurrent
                      ? 'bg-white/10 shadow-lg shadow-blue-500/20 border-2 border-blue-400'
                      : isCompleted
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-white/0 opacity-40'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon/Status */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <div className="size-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                          <Check className="size-5 text-white" strokeWidth={3} />
                        </div>
                      ) : isCurrent ? (
                        <div className="size-10 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse">
                          <span className="text-xl">{step.icon}</span>
                        </div>
                      ) : (
                        <div className="size-10 rounded-lg bg-white/5 border-2 border-white/20 flex items-center justify-center">
                          <span className="text-lg opacity-50">{step.icon}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className={`text-sm ${isCurrent ? 'text-white' : 'text-blue-100'}`}>
                          {step.title}
                        </span>
                        {isCurrent && (
                          <ChevronRight className="size-4 text-blue-300 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-blue-200/70">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[2.25rem] top-[4.5rem] w-0.5 h-3 bg-white/10">
                      {isCompleted && (
                        <div className="w-full h-full bg-gradient-to-b from-green-400 to-emerald-500" />
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Last Saved Info */}
        {lastSaved && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-start gap-3">
              <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                <Clock className="size-4 text-blue-300" />
              </div>
              <div>
                <p className="text-xs text-blue-200 mb-1">Last saved</p>
                <p className="text-sm text-white">{formatLastSaved(lastSaved)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <p className="text-xs text-blue-100 leading-relaxed">
            💡 <strong>Auto-save enabled:</strong> Your progress is saved automatically as you navigate through sections.
          </p>
        </div>
      </div>
    </div>
  );
}
