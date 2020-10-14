import json
my_list = []

def parse_file(filepath):
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
#print(my_list)