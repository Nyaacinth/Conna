namespace Conna.Views

open Avalonia
open Avalonia.Markup.Xaml
open Avalonia.Controls

type MainWindow() as this =
    inherit Window()

    do this.InitializeComponent()

    member private this.InitializeComponent() =
#if DEBUG
        this.AttachDevTools()
#endif
        AvaloniaXamlLoader.Load this
