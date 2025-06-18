namespace Conna

open System
open Avalonia.Controls
open Avalonia.Controls.Templates
open Conna.ViewModels

type ViewLocator() =
    interface IDataTemplate with

        member _.Build data =
            if isNull data then
                null
            else
                let name =
                    data.GetType().FullName.Replace("ViewModel", "View", StringComparison.Ordinal)

                let instanceType = Type.GetType name

                if isNull instanceType then
                    upcast TextBlock(Text = sprintf "Not Found: %s" name)
                else
                    downcast Activator.CreateInstance instanceType

        member _.Match data = data :? ViewModelBase
