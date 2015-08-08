# Copyright (c) 2015 Jesse Grosjean. All rights reserved.

assert = require 'assert'

# Public: A record of a single change in a target {Item}.
#
# A new mutation is created to record each attribute set, body text change,
# and child item's update. Use {Outline::onDidChange} to receive this mutation
# record so you can track what has changed as an outline is edited.
module.exports =
class Mutation

  ###
  Section: Constants
  ###

  # Public: ATTRIBUTE_CHANGED Mutation type constant.
  @ATTRIBUTE_CHANGED: 'attribute'

  # Public: BODT_TEXT_CHANGED Mutation type constant.
  @BODT_TEXT_CHANGED: 'bodyText'

  # Public: CHILDREN_CHANGED Mutation type constant.
  @CHILDREN_CHANGED: 'children'

  ###
  Section: Attributes
  ###

  # Public: Read-only {Item} target of the change delta.
  target: null

  # Public: Read-only type of change. {Mutation.ATTRIBUTE_CHANGED},
  # {Mutation.BODT_TEXT_CHANGED}, or {Mutation.CHILDREN_CHANGED}.
  type: null

  # Public: Read-only name of changed attribute in the target {Item}, or null.
  attributeName: null

  # Public: Read-only previous value of changed attribute in the target
  # {Item}, or null.
  attributeOldValue: null

  # Public: Read-only value of the body text location where the insert started
  # in the target {Item}, or null.
  insertedTextLocation: null

  # Public: Read-only value of length of the inserted body text in the target
  # {Item}, or null.
  insertedTextLength: null

  # Public: Read-only value of replaced body text in the target {Item}, or
  # null.
  replacedText: null

  # Public: Read-only {Array} of child {Item}s added to the target.
  addedItems: null

  # Public: Read-only {Array} of child {Item}s removed from the target.
  removedItems: null

  # Public: Read-only previous sibling {Item} of the added or removed Items,
  # or null.
  previousSibling: null

  # Public: Read-only next sibling {Item} of the added or removed Items, or
  # null.
  nextSibling: null

  @createAttributeMutation: (target, attributeName, attributeOldValue) ->
    mutation = new Mutation target, Mutation.ATTRIBUTE_CHANGED
    mutation.attributeName = attributeName
    mutation.attributeOldValue = attributeOldValue
    mutation

  @createBodyTextMutation: (target, insertedTextLocation, insertedTextLength, replacedText) ->
    mutation = new Mutation target, Mutation.BODT_TEXT_CHANGED
    mutation.insertedTextLocation = insertedTextLocation
    mutation.insertedTextLength = insertedTextLength
    mutation.replacedText = replacedText
    mutation

  @createChildrenMutation: (target, addedItems, removedItems, previousSibling, nextSibling) ->
    mutation = new Mutation target, Mutation.CHILDREN_CHANGED
    mutation.addedItems = addedItems or []
    mutation.removedItems = removedItems or []
    mutation.previousSibling = previousSibling
    mutation.nextSibling = nextSibling
    mutation

  constructor: (@target, @type) ->

  copy: ->
    mutation = new Mutation @target, @type
    mutation.attributeName = @attributeName
    mutation.attributeNewValue = @attributeNewValue
    mutation.attributeOldValue = @attributeOldValue
    mutation.insertedTextLocation = @insertedTextLocation
    mutation.insertedTextLength = @insertedTextLength
    mutation.replacedText = @replacedText?.copy()
    mutation.addedItems = @addedItems
    mutation.removedItems = @removedItems
    mutation.previousSibling = @previousSibling
    mutation.nextSibling = @nextSibling
    mutation

  performUndoOperation: ->
    switch @type
      when Mutation.ATTRIBUTE_CHANGED
        @target.setAttribute @attributeName, @attributeOldValue

      when Mutation.BODT_TEXT_CHANGED
        @target.replaceBodyTextInRange @replacedText, @insertedTextLocation, @insertedTextLength

      when Mutation.CHILDREN_CHANGED
        if @addedItems.length
          @target.removeChildren @addedItems

        if @removedItems.length
          @target.insertChildrenBefore @removedItems, @nextSibling

  coalesce: (operation) ->
    return false unless operation instanceof Mutation
    return false unless @target is operation.target
    return false unless @type is operation.type
    return false unless @type is Mutation.BODT_TEXT_CHANGED

    thisInsertedTextLocation = @insertedTextLocation
    thisInsertLength = @insertedTextLength
    thisInsertEnd = thisInsertedTextLocation + thisInsertLength
    thisInsertEnd = thisInsertedTextLocation + thisInsertLength

    newInsertedTextLocation = operation.insertedTextLocation
    newInsertedTextLength = operation.insertedTextLength
    newReplaceLength = operation.replacedText.length
    newReplaceEnd = newInsertedTextLocation + newReplaceLength

    singleInsertAtEnd = newInsertedTextLocation is thisInsertEnd and newInsertedTextLength is 1 and newReplaceLength is 0
    singleDeleteFromEnd = newReplaceEnd is thisInsertEnd and newInsertedTextLength is 0 and newReplaceLength is 1

    if singleInsertAtEnd
      @insertedTextLength++
      true
    else if singleDeleteFromEnd
      if newInsertedTextLocation < thisInsertedTextLocation
        @replacedText.insertStringAtLocation operation.replacedText, 0
        @insertedTextLocation--
      else
        @insertedTextLength--
      true
    else
      false