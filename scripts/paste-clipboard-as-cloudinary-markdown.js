/*
# Paste Clipboard Image as Cloudinary Markdown URL

- Checks if there is an image on the clipboard
- If image is present, it uploads to Cloudinary using the `upload_stream` method
- Asks user for the alternative text of the image using `mini` method
- Formats the Cloudinary response to a markdown image syntax with Alt text
- Replaces the selected text with this generated markdown
- If no image is stored in clipboard, it displays a message `No Image in Clipboard`

> Ensure you have your Cloudinary credentials stored in your environment variables for this script to run successfully. 
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
*/

// Name: Paste Clipboard Image as Cloudinary Markdown URL

import "@johnlindquist/kit"

import cloudinary from "cloudinary"

let buffer = await clipboard.readImage()

if (buffer && buffer.length) {
  cloudinary.config({
    cloud_name: await env("CLOUDINARY_CLOUD_NAME"),
    api_key: await env("CLOUDINARY_API_KEY"),
    api_secret: await env("CLOUDINARY_API_SECRET"),
  })

  let alt = await mini("Image alt text")

  let response = await new Promise((response, reject) => {
    let cloudStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "clipboard",
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          response(result)
        }
      }
    )

    new Readable({
      read() {
        this.push(buffer)
        this.push(null)
      },
    }).pipe(cloudStream)
  })

  // format however you want
  let markdown = `![${alt}](${response.url})`
  await setSelectedText(markdown)
} else {
  await div(md(`# No Image in Clipboard`))
}
