# setup

```sh
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt

```

# running

```sh
source env/bin/activate

chmod +x finesse/kat
export KATINI=finesse/kat.ini
export FINESSE_DIR=finesse
jupyter-lab notebook.ipynb
```

# used libraries

* jupyterlab
* pykat
  * Python interface to Finesse 2
  * requires finesse ([setup](https://git.ligo.org/finesse/pykat) for env vars)
    * Finesse is a fast interferometer simulation program. F
  * [Finesse 2 pdf manual](http://www.gwoptics.org/finesse/download/manual.pdf)

# upgrading

```sh
pip install --upgrade pip black pykat
pip install --upgrade jupyterlab jupyterlab_code_formatter
pip install --upgrade jupyterlab_vim jupyterlab-spellchecker
pip install --upgrade jupyterlab-git nbdime # for git-diffs.
```
