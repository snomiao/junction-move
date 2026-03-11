# junction-move

Free up space on your C: drive by moving heavy folders to an HDD, then mounting them back via a junction link — so all your software keeps working as if nothing moved.

Perfect for offloading bulky directories like `node_modules`, game installs, toolchains, or caches from a tidy SSD to a larger HDD, without reconfiguring any software.

> Only works on Windows.

## Use Case

Running low on C: drive space? Instead of uninstalling software or constantly cleaning up, move heavy folders to your HDD and create a junction link in the original location. Every program that uses that folder will continue to work seamlessly — they'll never know the files moved.

**Examples of folders you can move:**

- `C:\Go` → `D:\Go` (Go toolchain)
- `C:\Program Files\SomeApp` → `D:\SomeApp`
- `C:\Users\you\node_modules` → `D:\node_modules`

## Usage

```
Usage: npx junction-move <from_folder> <to_folder>
Example: npx junction-move C:\Go D:\Go
```

## How It Works

Two commands under the hood:

```bat
robocopy %from_path% %to_path% /MOVE /e
mklink /J %from_path% %to_path%
```

1. `robocopy` moves all files from the source to the destination
2. `mklink /J` creates a junction link at the original path pointing to the new location

The result: the folder appears to still be at `C:\...` but actually lives on your HDD.

## License

ISC