import { jsPDF } from "jspdf";

export const generatePDF = (itinerary) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const marginX = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - marginX * 2;
    const lineHeight = 10;
    const pageHeight = doc.internal.pageSize.getHeight();
    let cursorY = 20;

    const checkPageBreak = (neededHeight = lineHeight) => {
        if (cursorY + neededHeight > pageHeight - 20) {
            doc.addPage();
            cursorY = 20;
            return true;
        }
        return false;
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text("Travel Itinerary", marginX, cursorY);
    cursorY += 15;

    doc.setFontSize(16);
    doc.text(`Destination: ${itinerary.destination}`, marginX, cursorY);
    cursorY += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    const startDate = new Date(itinerary.startDate).toLocaleDateString();
    const endDate = new Date(itinerary.endDate).toLocaleDateString();
    doc.text(`${startDate} - ${endDate} (${itinerary.dailyPlan?.length || 0} Days)`, marginX, cursorY);
    cursorY += 20;

    doc.setDrawColor(200, 200, 200);
    doc.line(marginX, cursorY - 10, pageWidth - marginX, cursorY - 10);

    if (itinerary.dailyPlan && itinerary.dailyPlan.length > 0) {
        itinerary.dailyPlan.forEach((day) => {
            checkPageBreak(30);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFillColor(240, 240, 240);

            doc.rect(marginX, cursorY - 6, maxLineWidth, 10, 'F');
            doc.text(`Day ${day.day}: ${day.date || ''}`, marginX + 2, cursorY);
            cursorY += 12;

            if (day.activities && day.activities.length > 0) {
                day.activities.forEach((activity) => {
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(11);

                    const timeText = activity.time || "Anytime";
                    checkPageBreak(10);
                    doc.text(timeText, marginX + 5, cursorY);

                    doc.setFont("helvetica", "normal");
                    const description = activity.description || "";

                    const descX = marginX + 35;
                    const descWidth = maxLineWidth - 35;
                    const splitDescription = doc.splitTextToSize(description, descWidth);
                    const descHeight = splitDescription.length * 7;

                    if (cursorY + descHeight > pageHeight - 20) {
                        doc.addPage();
                        cursorY = 20;
                    }

                    if (cursorY + descHeight > pageHeight - 15) {
                        doc.addPage();
                        cursorY = 20;
                    }

                    doc.setFont("helvetica", "bold");
                    doc.text(timeText, marginX + 5, cursorY);

                    doc.setFont("helvetica", "normal");
                    doc.text(splitDescription, descX, cursorY);

                    cursorY += Math.max(descHeight, 10) + 5;
                });
            } else {
                doc.setFont("helvetica", "italic");
                doc.setFontSize(11);
                doc.text("No activities planning for this day.", marginX + 5, cursorY);
                cursorY += 15;
            }

            cursorY += 5;
        });
    }

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }

    const filename = `itinerary-${itinerary.destination.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    doc.save(filename);
};
