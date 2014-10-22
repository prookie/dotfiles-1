InsertBoilerplateView = require './insert-boilerplate-view'

module.exports =
  insertBoilerplateView: null

  # commands
  insert: ->
    editor = atom.workspace.activePaneItem
    editor.insertText('This is boilerplate')

  # livecycle - events
  activate: (state) ->
    # @insertBoilerplateView = new InsertBoilerplateView(state.insertBoilerplateViewState)
    atom.workspaceView.command "boilerplate:insert", => @insert()

  deactivate: ->
    @insertBoilerplateView.destroy()

  serialize: ->
    insertBoilerplateViewState: @insertBoilerplateView.serialize()
