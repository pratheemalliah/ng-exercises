Add their github fork repo as a remote to a clone of your own repo:

`git remote add other-guys-repo <url to other guys repo>`
Get their changes:

`git fetch other-guys-repo`
Checkout the branch where you want to merge:

`git checkout my_new_branch`
Merge their changes in (assuming they did their work on the master branch):

`git merge other-guys-repo/master`
Resolve conflicts, commit the resolutions and voila.