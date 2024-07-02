# @kylee0325/gift

some common node scripts.

## 安装依赖

```bash
npm | pnpm install -D @kylee0325/gift
yarn add -D @kylee0325/gift
```

## 使用

### 清除目录

```bash
# directory: 要清除的目录
# files: 要清除的目录或文件名称，多个以”,“分隔，如: "a,b,c.js"
gift clean [directory] -f [files]
# 或
gift clean [directory] --files=[files]
```

### 获取目录大小

```bash
# directory: 目录
gift size [directory]
```

### 获取帮助

```bash
gift -h
gift --help
```

### 获取当前版本

```bash
gift -v
gift --version
```
