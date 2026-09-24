const PDFDocument = require("pdfkit");
const { generateTailoredResume } = require("./ai.service.js");

const PAGE_MARGIN = 40;

function buildContentBlocks(data) {
  const blocks = [];

  blocks.push({ type: "name", text: data.name });
  blocks.push({ type: "contact", text: data.contactLine });
  if (data.summary) blocks.push({ type: "summary", text: data.summary });

  if (data.skills?.length) {
    blocks.push({ type: "sectionTitle", text: "Skills" });
    blocks.push({ type: "skills", text: data.skills.join("  •  ") });
  }

  if (data.experience?.length) {
    blocks.push({ type: "sectionTitle", text: "Experience" });
    for (const job of data.experience) {
      blocks.push({
        type: "jobHeader",
        title: job.title,
        company: job.company,
        dates: job.dates,
      });
      for (const bullet of job.bullets) {
        blocks.push({ type: "bullet", text: bullet });
      }
    }
  }

  if (data.projects?.length) {
    blocks.push({ type: "sectionTitle", text: "Projects" });
    for (const proj of data.projects) {
      blocks.push({ type: "projectHeader", text: proj.name });
      for (const bullet of proj.bullets) {
        blocks.push({ type: "bullet", text: bullet });
      }
    }
  }

  if (data.education?.length) {
    blocks.push({ type: "sectionTitle", text: "Education" });
    for (const edu of data.education) {
      blocks.push({
        type: "eduLine",
        text: `${edu.degree} — ${edu.institution} (${edu.dates})`,
      });
    }
  }

  return blocks;
}

function estimateHeight(doc, blocks, fontSize) {
  const usableWidth = doc.page.width - PAGE_MARGIN * 2;
  let height = 0;

  for (const block of blocks) {
    switch (block.type) {
      case "name":
        doc.fontSize(fontSize + 8).font("Helvetica-Bold");
        height += doc.heightOfString(block.text, { width: usableWidth }) + 2;
        break;
      case "contact":
        doc.fontSize(fontSize - 1).font("Helvetica");
        height += doc.heightOfString(block.text, { width: usableWidth }) + 8;
        break;
      case "summary":
        doc.fontSize(fontSize).font("Helvetica");
        height += doc.heightOfString(block.text, { width: usableWidth }) + 8;
        break;
      case "sectionTitle":
        doc.fontSize(fontSize + 2).font("Helvetica-Bold");
        height += doc.heightOfString(block.text, { width: usableWidth }) + 4;
        break;
      case "skills":
        doc.fontSize(fontSize).font("Helvetica");
        height += doc.heightOfString(block.text, { width: usableWidth }) + 8;
        break;
      case "jobHeader":
      case "projectHeader":
        doc.fontSize(fontSize).font("Helvetica-Bold");
        height +=
          doc.heightOfString(
            block.type === "jobHeader"
              ? `${block.title} — ${block.company} (${block.dates})`
              : block.text,
            { width: usableWidth },
          ) + 2;
        break;
      case "bullet":
        doc.fontSize(fontSize - 0.5).font("Helvetica");
        height +=
          doc.heightOfString(`•  ${block.text}`, {
            width: usableWidth - 10,
          }) + 2;
        break;
      case "eduLine":
        doc.fontSize(fontSize).font("Helvetica");
        height += doc.heightOfString(block.text, { width: usableWidth }) + 4;
        break;
    }
  }

  return height;
}

function pickFittingFontSize(doc, blocks, usableHeight) {
  const candidates = [11, 10.5, 10, 9.5, 9, 8.5, 8, 7.5, 7];
  for (const size of candidates) {
    const h = estimateHeight(doc, blocks, size);
    if (h <= usableHeight) return size;
  }
  return 7;
}

function renderBlocks(doc, blocks, fontSize) {
  const usableWidth = doc.page.width - PAGE_MARGIN * 2;

  for (const block of blocks) {
    switch (block.type) {
      case "name":
        doc
          .fontSize(fontSize + 8)
          .font("Helvetica-Bold")
          .text(block.text, { width: usableWidth });
        doc.moveDown(0.1);
        break;
      case "contact":
        doc
          .fontSize(fontSize - 1)
          .font("Helvetica")
          .fillColor("#444")
          .text(block.text, { width: usableWidth });
        doc.fillColor("#000").moveDown(0.5);
        break;
      case "summary":
        doc
          .fontSize(fontSize)
          .font("Helvetica")
          .text(block.text, { width: usableWidth });
        doc.moveDown(0.5);
        break;
      case "sectionTitle":
        doc
          .fontSize(fontSize + 2)
          .font("Helvetica-Bold")
          .text(block.text.toUpperCase(), { width: usableWidth });
        doc
          .moveTo(PAGE_MARGIN, doc.y + 1)
          .lineTo(doc.page.width - PAGE_MARGIN, doc.y + 1)
          .strokeColor("#ccc")
          .stroke();
        doc.moveDown(0.3);
        break;
      case "skills":
        doc
          .fontSize(fontSize)
          .font("Helvetica")
          .text(block.text, { width: usableWidth });
        doc.moveDown(0.5);
        break;
      case "jobHeader":
        doc
          .fontSize(fontSize)
          .font("Helvetica-Bold")
          .text(`${block.title} — ${block.company} (${block.dates})`, {
            width: usableWidth,
          });
        doc.moveDown(0.1);
        break;
      case "projectHeader":
        doc
          .fontSize(fontSize)
          .font("Helvetica-Bold")
          .text(block.text, { width: usableWidth });
        doc.moveDown(0.1);
        break;
      case "bullet":
        doc
          .fontSize(fontSize - 0.5)
          .font("Helvetica")
          .text(`•  ${block.text}`, { width: usableWidth - 10, indent: 10 });
        doc.moveDown(0.1);
        break;
      case "eduLine":
        doc
          .fontSize(fontSize)
          .font("Helvetica")
          .text(block.text, { width: usableWidth });
        doc.moveDown(0.2);
        break;
    }
  }
}

async function generateResumePdf({ resume, jobDescription, selfDescription }) {
  const data = await generateTailoredResume({
    resume,
    jobDescription,
    selfDescription,
  });
  const blocks = buildContentBlocks(data);

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: PAGE_MARGIN,
      size: "A4",
      autoFirstPage: true,
    });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const usableHeight = doc.page.height - PAGE_MARGIN * 2;
    const fontSize = pickFittingFontSize(doc, blocks, usableHeight);

    renderBlocks(doc, blocks, fontSize);
    doc.end();
  });
}

module.exports = { generateResumePdf };
