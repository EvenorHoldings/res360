import { createFileRoute } from '@tanstack/react-router';
import { Workspace } from '@/components/assurance/Workspace';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/_authenticated/operations')({head:()=>pageHead('Assurance operations | Res360','Assigned residence inspections and independent evidence reviews.','/operations'),component:()=> <Workspace staff/>});
