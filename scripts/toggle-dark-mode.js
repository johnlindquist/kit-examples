// Menu: Toggle Dark Mode
// Description: Switches osx between light/dark modes
// Author: John Lindquist
// Twitter: @johnlindquist

await applescript(`
tell application "System Events"

tell appearance preferences

set dark mode to not dark mode

end tell

end tell
`)
