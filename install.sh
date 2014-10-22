#!/bin/bash

# start the engines!
echo "Start the setup of the dotfiles"

# .osx install
echo "Run .osx"
./.osx

# zsh install
echo "Install zsh-config"
echo "Symlink the zsh-files to home"

ln zsh/.zshrc ~/.zshrc

# atom config
ln -s ~/dotfiles/atom ~/atom    # TODO: replace with current path
