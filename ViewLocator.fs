namespace Conna

open System
open Avalonia.Controls
open Avalonia.Controls.Templates
open Conna.ViewModels

type ViewLocator() =
    static let Registration = Collections.Generic.Dictionary<Type, Func<Control>>()

    static member Register<'TViewModel, 'TView when 'TView: (new: unit -> 'TView) and 'TView :> Control>() =
        Registration.Add(typeof<'TViewModel>, Func<Control>(fun () -> new 'TView() :> Control))

    static member Register<'TViewModel, 'TView when 'TView :> Control>(factory: Func<'TView>) =
        Registration.Add(typeof<'TViewModel>, Func<Control>(fun () -> factory.Invoke() :> Control))

    interface IDataTemplate with

        member _.Build(data: obj) =
            if isNull data then
                null
            else
                let typ = data.GetType()

                match Registration.TryGetValue typ with
                | true, factory -> factory.Invoke()
                | false, _ -> TextBlock(Text = sprintf "Not Found: %s" typ.Name) :> Control

        member _.Match data = data :? ViewModelBase
