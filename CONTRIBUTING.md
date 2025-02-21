
### Fork the repository and create a new branch

Note: [GitHub has several good guides on things like pull requests, forks and reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started), which may be helpful. 


1. create a fork of this repository, which you can do using GitHub interface. 

2. Clone the reposity to your local PC and create a new branch where you will add your changes: 

(rename `new-branch-name` to something more sensible)
```bash
git checkout -b new-branch-name
```

### Adding a new example 

3. Create an image of your new example and add it to the `/img` foler. Number the image sequentlially. The image should be either of type .jpg or .png. 

4. Add a new entry in `LINKS.json`. See the previous entries for what fields to include. You do not need to add `width` or `height`, those will be calculated automatically in the next step. 

5. Update the site with your new entry by running the update script:

```bash
./update.sh
```

6. Make sure to preview the `README.md` to check your new table entry looks good.  


### View the site locally

After running the update script in step 6, you can check the changes to the site locally by running the following commands: 

```bash
cd awesome-jbrowse2
yarn install
yarn develop 
```

You should then be able to visit `http://localhost:8000/` in your browser and see a live preview of the site. 

### When ready

8. Add your changes, commit them and then push them to GitHub

```bash
git add file1 file2 file3 
git commit 
git push --set-upstream origin new-branch-name
```

9. Visit your forked branch on GitHub's interface and create a PR. 
