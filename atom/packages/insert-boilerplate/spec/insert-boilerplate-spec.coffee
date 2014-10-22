InsertBoilerplate = require '../lib/insert-boilerplate'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "InsertBoilerplate", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('insertBoilerplate')

  describe "when the insert-boilerplate:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.insert-boilerplate')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'insert-boilerplate:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.insert-boilerplate')).toExist()
        atom.workspaceView.trigger 'insert-boilerplate:toggle'
        expect(atom.workspaceView.find('.insert-boilerplate')).not.toExist()
