await arg("This is the metadata tutorial 😊")

/**
 * 1. Name Your Script in the Menu
 * Start by adding `// Name: My Super Cool Script` to the top of this file
 * Now when you launch the main menu with `cmd ;`, you'll find this script matches
 * whatever you put next to `// Name:`!
 * The name will live-update anytime you save the file.
 */

/**
 * 2. Describe and Take Credit
 * Adding a `// Description: This script does amazing stuff` will help your script
 * stand out in the list. You can also identify:
 * `// Author: My Name`
 * `// Twitter: @myname`
 * So you get proper credit when your script launches or you share it with someone else.
 */

/**
 * 3. Keyboard Shortcuts
 * Add `// Shortcut: command alt i` to the top of this file then press that combo
 * to launch it. You can change it to any combination of `cmd opt shift ctrl key`
 *
 * You can also set and update keyboard shortcuts in the Main -> Help -> Change Script Shortcut
 */

/**
 * 4. Schedule Scripts
 */

// Add `// Schedule: */10 * * * * *` or any valid Cron Job syntax to runs scripts on a schedule
// This adds a "cron" tab to the main menu so you can check on upcoming scripts
// Note: these scripts must not include `arg` or they will time out after 10 seconds

/**
 * 5. System Events
 * add `// System: unlock-screen` to run a script after dismissing the lock screen
 * Other available events are: suspend, resume, on-ac, on-battery, shutdown, lock-screen, unlock-screen, user-did-become-active, user-did-resign-active
 *
 *  Read about the events here: https://www.electronjs.org/docs/api/power-monitor#events
 */
