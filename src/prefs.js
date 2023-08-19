import Adw from "gi://Adw";
import Gio from "gi://Gio";
import Gtk from "gi://Gtk";

import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const MOVE_WINDOW_WHEN_MAXIMIZED = 'move-window-when-maximized';

export default class Preferences extends ExtensionPreferences {
  fillPreferencesWindow(window) {
    // Make sure the window doesn't outlive the settings object
    window._settings = this.getSettings();
  
    const page = this._createPage(window);
    window.add(page);
  }

  _createPage(window) {
    // Create a preferences page, with a single group
    const page = new Adw.PreferencesPage();
      
    const group = new Adw.PreferencesGroup();
    const maximizedToggleRow = this._createMaximizedToggleRow(window);
    group.add(maximizedToggleRow);

    page.add(group);
    
    return page;
  }

  _createMaximizedToggleRow(window) {
    // Create a new preferences row
    const row = new Adw.ActionRow({ title: 'Move window when maximized' });

    // Create a switch and bind its value to the `show-indicator` key
    const toggle = new Gtk.Switch({
      active: window._settings.get_boolean(MOVE_WINDOW_WHEN_MAXIMIZED),
      valign: Gtk.Align.CENTER,
    });

    window._settings.bind(
      MOVE_WINDOW_WHEN_MAXIMIZED,
      toggle,
      'active',
      Gio.SettingsBindFlags.DEFAULT,
    );

    // Add the switch to the row
    row.add_suffix(toggle);
    row.activatable_widget = toggle;

    return row;
  }
}
