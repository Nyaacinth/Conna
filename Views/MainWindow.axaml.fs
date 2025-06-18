namespace Conna.Views

open Avalonia
open Avalonia.Markup.Xaml
open Ursa.Controls

type MainWindow() as this =
    inherit UrsaWindow()

    do this.InitializeComponent()

    member private this.InitializeComponent() =
#if DEBUG
        this.AttachDevTools()
#endif
        AvaloniaXamlLoader.Load this
