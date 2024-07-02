function getOptions(options) {
    return Object.assign(
        { parentKey: "parent_id", childrenKey: "children", idKey: "id" },
        options
    );
}

/**
 * 将数组转换为树形结构
 * @param list 数组
 * @param rootId 根节点的id
 * @param options 配置项
 */
export function arrayToTree(list, rootId, options) {
    const { parentKey, childrenKey, idKey } = getOptions(options);
    const treeData = [];
    const idMap = {};

    list.forEach((item) => {
        const newItem = JSON.parse(JSON.stringify(item));
        const id = newItem[idKey];
        const parentId = newItem[parentKey];

        idMap[id] = {
            ...newItem,
            ...(idMap[id] && idMap[id][childrenKey]
                ? { [childrenKey]: idMap[id][childrenKey] }
                : null),
        };

        const treeItem = idMap[id];

        if (parentId === rootId || !parentId) {
            treeData.push(treeItem);
        } else if (idMap[parentId]) {
            if (idMap[parentId][childrenKey]) {
                idMap[parentId][childrenKey].push(treeItem);
            } else {
                idMap[parentId][childrenKey] = [treeItem];
            }
        } else {
            idMap[parentId] = { [childrenKey]: [treeItem] };
        }
    });

    return treeData;
}

/**
 * @description: 对树形数据进行格式化
 * @param {any} tree
 * @param {Function} func
 * @param {*} childKey
 * @return {*}
 */
export function formatTree(tree, func, childKey = "children") {
    return tree.map((item) => {
        const { [childKey]: children, ...rest } = item;
        if (children) {
            return {
                ...func({ ...rest }),
                [childKey]: formatTree(children, func, childKey),
            };
        }

        return func(item);
    });
}
