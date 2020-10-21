"""Parse file of pollinator plant data."""

def parse_file(filepath):
    """Parse file: first line is column names,

    remaining lines are data. Returns a list of key-value pairs."""

    my_list = []

    with open(filepath) as f:
        lines = f.readlines()
        columns = []

        i = 0
        for line in lines:
            print(line)
            line = line.strip()
            print(line)
            if line:
                if i == 0:
                    columns = [item.strip() for item in line.split(';')]
                    i = i + 1
                    print(columns)
                else:
                    d = {}
                    data = [item.strip() for item in line.split(';')]
                    print(data)
                    for index, element in enumerate(data):
                        d[columns[index]] = data[index]

                    my_list.append(d)


    return my_list