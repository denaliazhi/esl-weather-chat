# Template
By Denalia Zhi  [👩🏻](https://github.com/denaliazhi)

### Configure basic HTML, CSS, and JS files with Webpack

Note for `deploy` script in `package.json`:
- Before first deploy, run `git branch gh-pages`
- Make sure all changes have been committed
- For every deploy:
    - `git checkout gh-pages && git merge main --no-edit`
    - `npm run build`
    - `npm run deploy` equivalent to
        - `git add dist -f && git commit -m "Deployment commit"`
        - `git subtree push --prefix dist origin gh-pages`
    - `git checkout main`

---

<img width="1457" height="914" alt="Project cover image" src="" />

<br>Project description

**Check it out** → [<kbd> <br> Live preview <br> </kbd>]()

---

### 👩🏻‍💻 Technical details
This app was my submission for the [--- Project]() in TOP's[^1] Fullstack Javascript path

#### Premise
Project criteria

|Language | Concepts |
|---------| ---------|
| `Javascript` |  |
| `CSS` | |
| `HTML` | |


[^1]: What is TOP? [The Odin Project](https://www.theodinproject.com/about) is an open-source, self-guided web development curriculum. I started TOP in April 2025.
