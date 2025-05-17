use crate::frontend::{MainApp, Utils};
use slint::ComponentHandle;

pub fn register_on_utils(app: &MainApp) {
    app.global::<Utils>()
        .on_get_app_version(|| env!("CARGO_PKG_VERSION").into());
}
