import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBody } from '@/components/SiteFrame';
import { EmergencyGuidance, ConcernForm } from '@/components/assurance/StudentSafety';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/safety')({head:()=>pageHead('Student safety centre | Res360','Emergency guidance and private residence concern reporting.','/safety'),component:()=> <PageBody title="Safety centre"><EmergencyGuidance/><h2 className="pt-5 text-xl font-bold">Private concern report</h2><ConcernForm/><Link to="/my-reports" className="inline-block underline">View my case status</Link></PageBody>});
