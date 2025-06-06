// Prevent console window in addition to Slint window in Windows release builds when, e.g., starting the app via file manager. Ignored on other platforms.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod register_globals;

mod frontend {
    slint::include_modules!();
}

use frontend::MainApp;
use slint::ComponentHandle;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let app = MainApp::new()?;

    register_globals::utils::apply_on(&app);

    app.run()?;

    Ok(())
}
