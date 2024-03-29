![](https://github.com/bmedicke/optical-cavity/blob/2134b36ef828406b8309c86800d338a1c2179ad0/cavity.png?raw=true)

# setup

```sh
python3 -m venv env # create virtual environment.
source env/bin/activate # activate it.
pip install -r requirements.txt # install requirements.

xattr -cr finesse/kat # sign macos binary.
chmod +x finesse_macos/kat

# see https://stackoverflow.com/a/67634217 for M1 Macs.
```

# running

```sh
source env/bin/activate

export KATINI=kat.ini

# depending on OS:
export FINESSE_DIR=finesse_linux
export FINESSE_DIR=finesse_macos

jupyter-lab setup-test.ipynb
```

# used libraries

* jupyterlab
* [pykat](https://git.ligo.org/finesse/pykat.git)
  * Python interface to Finesse 2
  * requires finesse ([setup](https://git.ligo.org/finesse/pykat) for env vars)
    * Finesse is a fast interferometer simulation program. F
  * [Finesse 2 pdf manual](http://www.gwoptics.org/finesse/download/manual.pdf)

# upgrading/alternative install

```sh
pip install --upgrade pip wheel black
pip install --upgrade --no-cache-dir pykat
pip install --upgrade jupyterlab jupyterlab_code_formatter
pip install --upgrade jupyterlab_vim jupyterlab-spellchecker
pip install --upgrade jupyterlab-git nbdime # for git-diffs.
pip install --upgrade ipympl # for %matplotlib widget

# for pdf generation in jupyterlab:
apt install texlive-xetex
```

# related repos

* [quantum_cryptography](https://github.com/bmedicke/quantum_cryptography/)
  * [lightsensor notebook](https://github.com/bmedicke/quantum_cryptography/blob/main/notebooks/Test_Lightsensor.ipynb)
  * [bob notebook](https://github.com/bmedicke/quantum_cryptography/blob/main/notebooks/Bob.ipynb)
  * [qcrypt lib](https://github.com/bmedicke/quantum_cryptography/blob/main/notebooks/qcrypt/hardware/lightsensor.py)
