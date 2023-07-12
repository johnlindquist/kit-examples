/*
# OCR Clipboard Image

- This script analyzes the clipboard to see if there is an image present
- If an image is found, it uses the Tesseract OCR library to convert the content of the image into text and copies to the clipboard
*/

// Name: Optical Character Recognition
// Description: Extract text from images
// Author: Kent C. Dodds
// Twitter: @kentcdodds

import "@johnlindquist/kit"
import Tesseract from "tesseract.js"

const clipboardImage = await clipboard.readImage()

if (clipboardImage.byteLength) {
  const { data } = await Tesseract.recognize(clipboardImage, "eng", {
    logger: m => console.log(m),
  })
  clipboard.writeText(data.text)
} else {
  let selectedFiles = await getSelectedFile()
  let filePaths

  if (selectedFiles) {
    filePaths = selectedFiles.split("\n")
  } else {
    let droppedFiles = await drop({ placeholder: "Drop images to compress" })
    filePaths = droppedFiles.map(file => file.path)
  }
  for (const filePath of filePaths) {
    const { data } = await Tesseract.recognize(filePath, "eng", {
      logger: m => console.log(m),
    })
    clipboard.writeText(data.text)
  }
}

notify({
  title: "OCR finished",
  message: `Copied text to your clipboard`,
})
