#!/bin/bash

DEV_DIR=$(dirname "$0")

color_ok() {
  echo "\033[32m$1\033[0m"
}
color_error() {
  echo "\033[41m$1\033[0m"
}
color_info() {
  echo "\033[1m\033[4m$1\033[0m"
}
color_bold() {
  echo "\033[1m$1\033[0m"
}
printSect() {
  printf "$(color_bold "--- ${1^^} ---")\n"
}
printHead() {
  echo "|"
  printf "|  $(color_info $1)\n"
  echo "|     $2"
  echo "|"
}
# checking enviroment condition

CHECK_RESULT_CODE=0

check_command_exist() {
  local CHECK_RESULT=$(command -v $1)
  if [[ $CHECK_RESULT ]]; then
      printf "CHECK $(color_bold $1)... $(color_ok "FOUND") -> $CHECK_RESULT \n"
      CHECK_RESULT_CODE=200
  else
      printf "CHECK $(color_bold $1)... $(color_error "### MISSING!!! ###") \n"
      CHECK_RESULT_CODE=404
  fi
}

SOLVING_RESULT_CODE=0

command_not_exist_solving() {
  local USER_CHOICE=""
  local LOOPER_CONTROLL=1

  printHead "SOLVING MISSING PROGRAM PROCEDURE:" "SUBJECT: $1"

  while [ $LOOPER_CONTROLL == 1 ] ; do
    printf "### $(color_bold "OPTIONS"): (case insensitive)\n"
    echo "EDIT - edit enviroment setup ini file and update command"
    echo "INSTALL - this script will ragequit"
    echo "EXIT - this script will ragequit"
    read USER_CHOICE
    declare -u USER_CHOICE
    case $USER_CHOICE in
      "EDIT") nano $DEV_DIR/env-setup.ini && SOLVING_RESULT_CODE=302 && return ;;
      "INSTALL") sudo apt install $1 && SOLVING_RESULT_CODE=100 && return ;;
      "EXIT") LOOPER_CONTROLL=0 && SOLVING_RESULT_CODE=403 && return ;;
      *) printf "$(color_error ERROR) \n\n unknown option: $USER_CHOICE\n\n"
    esac
  done
}

REPEAT_SCRIPT=1

require_check() {
  check_command_exist $1
  if [ "$CHECK_RESULT_CODE" == "404" ]; then
    command_not_exist_solving $1
    case $SOLVING_RESULT_CODE in
      100) printf "\n\nscript reset after installation...\n\n" && REPEAT_SCRIPT=1 && return ;;
      302) printf "\n\nscript reset after edition of INI file...\n\n" && REPEAT_SCRIPT=1 && return ;;
      403) printf "\n\nMISSION ABORTED!\n\n" && exit 0 ;;
      *) exit 500
    esac
  fi
}

#sudo apt update
#sudo apt upgrade

#echo $DEV_DIR
while [ $REPEAT_SCRIPT == "1" ] ; do

  printHead "carnival-toolbox DEVELOPER" "QUICK WORK LAUNCHER"

  source <(grep = $DEV_DIR/env-setup.ini)
  REPEAT_SCRIPT=0

  #PIP_REQUIRE=$pipRequire

  printSect "needed tools checkup"

  require_check $NPM
  if [ $REPEAT_SCRIPT == "1" ] ; then continue ;fi
  require_check $PIP
  if [ $REPEAT_SCRIPT == "1" ] ; then continue ;fi
  require_check $PYTHON
  if [ $REPEAT_SCRIPT == "1" ] ; then continue ;fi
  require_check $NODE
  if [ $REPEAT_SCRIPT == "1" ] ; then continue ;fi

  printSect "virtual enviroment checkup"

  if [ ! -d _DEV_VENV ] ; then
    echo "instalation of python3-venv by APT-GET:"
    sudo apt install python3-venv
    echo "creating virtual enviroment..."
    $PYTHON -m venv _DEV_VENV
  else
    echo "VENV directory exist, skipping install..."
  fi
  printf "virtual enviroment location: $(color_info "$(pwd)/_DEV_VENV")\n"
  echo "mounting source (_DEV_VENV/bin/activate)"
  source _DEV_VENV/bin/activate
  #source <(grep = $DEV_DIR/env-setup.ini)
  printSect "installing pip packages"

  if [ ! -r $DEV_DIR/requirements.txt ] ; then
    printf "$(color_bold "FILE \"$DEV_DIR/requirements.txt\" NOT EXISTS!,")\n"
    printf "$(color_bold "pip install by ini file presets...") (pynpm PyGithub GitPython requests)\n"
    $PIP install pynpm PyGithub GitPython requests
    printf "$(color_bold "SAVING \"$DEV_DIR/requirements.txt\"...")\n"
    $PIP freeze >$DEV_DIR/requirements.txt
  else
    printf "$(color_bold "FILE \"$DEV_DIR/requirements.txt\" EXISTS!,")\n"
    printf "$(color_bold "pip install by \"$DEV_DIR/requirements.txt\"...")\n"
    $PIP install -r $DEV_DIR/requirements.txt
  fi
  printSect "setting up npm"
  if [ ! -d node_modules ] ; then
    echo "npm installation with keeped dev dependencies"
    $NPM install --save-dev
  else
    echo "npm already installed (node_module exist)"
    echo "skipping..."
  fi
  printf "$(color_bold "updating npm packages")\n"
  $NPM update
  printf "$(color_bold "for safety npm audit fix")\n"
  $NPM audit fix
  #
  printSect "run devtools"
  $PYTHON ./developement/main.py
  printSect "script execution done!"
done
exit 0
