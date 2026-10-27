import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/assurance/Workspace';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/_authenticated/portfolio')({head:()=>pageHead('Landlord workspace | Res360','Manage private residence readiness, documents and inspection responses.','/portfolio'),component:()=> <Workspace/>});
