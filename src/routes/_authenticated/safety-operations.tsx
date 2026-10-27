import { createFileRoute } from '@tanstack/react-router';
import { SiteFrame } from '@/components/SiteFrame';
import { SafetyQueue } from '@/components/assurance/SafetyQueue';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/_authenticated/safety-operations')({head:()=>pageHead('Safety case operations | Res360','Assigned private concern triage and case status updates.','/safety-operations'),component:()=> <SiteFrame><main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10"><h1 className="mb-6 text-3xl font-bold">Safety case operations</h1><SafetyQueue/></main></SiteFrame>});
