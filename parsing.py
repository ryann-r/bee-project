import json
my_list = []

with open('pollinator-plants.txt') as f:
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

print(json.dumps(my_list))