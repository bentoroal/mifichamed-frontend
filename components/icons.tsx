import React from 'react';
import { 
  Stethoscope, 
  ArrowRight, 
  PlayCircle as Play, 
  CheckCircle2, 
  Activity, 
  Pill as PillIcon, 
  FileText, 
  ShieldCheck, 
  EyeOff, 
  HeartPulse, 
  UserPlus 
} from 'lucide-react';

interface IconProps {
  className?: string;
}

export const MedicalServices = ({ className }: IconProps) => <Stethoscope className={className} />;
export const ArrowForward = ({ className }: IconProps) => <ArrowRight className={className} />;
export const PlayCircle = ({ className }: IconProps) => <Play className={className} />;
export const CheckCircle = ({ className }: IconProps) => <CheckCircle2 className={className} />;
export const Monitoring = ({ className }: IconProps) => <Activity className={className} />;
export const Pill = ({ className }: IconProps) => <PillIcon className={className} />;
export const Description = ({ className }: IconProps) => <FileText className={className} />;
export const VerifiedUser = ({ className }: IconProps) => <ShieldCheck className={className} />;
export const VisibilityOff = ({ className }: IconProps) => <EyeOff className={className} />;
export const HealthMetrics = ({ className }: IconProps) => <HeartPulse className={className} />;
export const AppRegistration = ({ className }: IconProps) => <UserPlus className={className} />;