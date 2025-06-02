use crate::frontend::{MainApp, Utils};
use convert_case::{Case, Casing};
use slint::ComponentHandle;

pub fn apply_on(app: &MainApp) {
    let utils_global = app.global::<Utils>();
    utils_global.on_get_app_name(|| env!("CARGO_PKG_NAME").to_case(Case::Title).into());
    utils_global.on_get_app_semver(|| env!("CARGO_PKG_VERSION").into());
}
