import jsPDF from 'jspdf';
import autoTable, { CellDef } from 'jspdf-autotable';
import { ITimeCsv } from '../interfaces/Types';

const header = [
  ['Kalenderwoche', 'Datum', 'Arbeitszeit (h)', 'Arbeitszeit Saldo (h)', 'Verfügungszeit (min)', 'Verfügungszeit Saldo (min)', 'Notizen'],
];

export const exportPdf = (data: ITimeCsv[]) => {
  const doc = new jsPDF();

  const weeks = new Set(data.map((item) => item.week));

  weeks.forEach((week) => {
    const weekData = data.filter((item) => item.week == week);

    const body: CellDef[][] = [];

    let workingTimeSum = 0;
    let workingTimeBalanceSum = 0;
    let availableTimeSum = 0;
    let availableTimeBalance = 0;

    weekData.forEach((item) => {
      workingTimeSum = workingTimeSum + item.workingTime;
      workingTimeBalanceSum = workingTimeBalanceSum + item.workingTimeBalance;
      availableTimeSum = availableTimeSum + item.availableTime;
      availableTimeBalance = availableTimeBalance + item.availableTimeBalance;

      const row: CellDef[] = [
        item.week.toString() as CellDef,
        item.day as CellDef,
        (item.workingTime / 60).toString() as CellDef,
        (item.workingTimeBalance / 60).toString() as CellDef,
        item.availableTime.toString() as CellDef,
        item.availableTimeBalance.toString() as CellDef,
        item.notes as CellDef,
      ];
      body.push(row);
    });

    body.push([
      '' as CellDef,
      '' as CellDef,
      (workingTimeSum / 60).toString() as CellDef,
      (workingTimeBalanceSum / 60).toString() as CellDef,
      availableTimeSum.toString() as CellDef,
      availableTimeBalance.toString() as CellDef,
      '' as CellDef,
    ]);

    autoTable(doc, {
      head: header,
      body: body,
    });
  });

  doc.save('zeiten.pdf');
};

export default { exportPdf };
