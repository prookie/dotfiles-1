#!/bin/bash

# start the engines!
echo "Start the setup of the dotfiles"

# .osx install
echo "Run .osx"
./.osx      # TODO: review all settings in .osx

# zsh install
echo "Install zsh-config"
echo "Symlink the zsh-files to home"

ln zsh/.zshrc ~/.zshrc

echo "Get oh-my-zsh"
git clone https://github.com/robbyrussell/oh-my-zsh.git zsh/oh-my-zsh

# atom config
ln -s ~/dotfiles/atom ~/.atom    # TODO: replace with current path
