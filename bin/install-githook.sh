#! /usr/bin/env bash

# Change PWD to parent dir of this script (repository root)
pushd $(dirname "$0")/.. >/dev/null

# This works for standard repo or submodule
gitDir=$(git rev-parse --git-dir)
# Location of hookSource is relative to repo root
hookSource=.githook-pre-commit
hookTarget="$gitDir/hooks/pre-commit"
backup=$hookTarget.backup-$(date --iso-8601=seconds)

#  Test PWD is repo root and package root
if ([[ -d .git ]] || [[ -f .git ]]) && [[ -f package.json ]]; then
    # Save existing
    if [[ -f "$hookTarget" ]]; then
        mv --force "$hookTarget" "$backup"
    fi &&
        cp --force "$hookSource" "$hookTarget" &&
        chmod u+x "$hookTarget" &&
        git config --local commit.template ./.git-commit-template.txt
else
    printf "ERROR: This script must be run from the repository root directory\n"
    exit 1
fi

popd >/dev/null
