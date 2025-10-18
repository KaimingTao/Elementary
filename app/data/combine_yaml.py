import yaml
import glob
import sys
from pathlib import Path


def combine_yaml(input_dir, output_file):
    combined_data = []

    for file_path in input_dir.iterdir():

        if file_path.suffix != '.yaml':
            continue
        print(file_path)

        with open(file_path, "r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
            combined_data.extend(data)

    print('#cards:', len(combined_data))
    with open(output_file, "w", encoding="utf-8") as f:
        yaml.safe_dump(combined_data, f, sort_keys=False, allow_unicode=True)

    print(f"Combined YAML saved to: {output_file}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python combine_yaml.py <input_folder> <output_file>")
        sys.exit(1)

    input_dir = Path(sys.argv[1])
    output_file = Path(sys.argv[2])
    combine_yaml(input_dir, output_file)
