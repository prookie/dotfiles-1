{View} = require 'atom'

module.exports =
class InsertBoilerplateView extends View
  @content: ->
    @div class: 'insert-boilerplate overlay from-top', =>
      @div "The InsertBoilerplate package is Alive! It's ALIVE!", class: "message"

  initialize: (serializeState) ->
    atom.workspaceView.command "insert-boilerplate:toggle", => @toggle()

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    console.log "InsertBoilerplateView was toggled!"
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)
