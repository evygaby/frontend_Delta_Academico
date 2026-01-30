// src/app/utils/pdfmake-wrapper.ts

import * as pdfMake from 'pdfmake/build/pdfmake';
import { vfs } from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = vfs;

export default pdfMake;