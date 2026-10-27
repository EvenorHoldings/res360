import { createFileRoute } from '@tanstack/react-router';
import { PageBody } from '@/components/SiteFrame';
import { MySafetyCases } from '@/components/assurance/StudentSafety';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/_authenticated/my-reports')({head:()=>pageHead('My concern reports | Res360','Private status of your residence safety reports.','/my-reports'),component:()=> <PageBody title="My concern reports"><MySafetyCases/></PageBody>});
