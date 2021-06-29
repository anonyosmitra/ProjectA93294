import sqlite3

import pymysql as mysql
import bleach
import sys, json, decimal


fileName='database.db'


def whereGen(ty=None, data=None, target=None, gate="and", eq="=", outGate=None):
	if ty == "between" and len(data) == 2:
		return appendQuery("%0>=%1 and %2<=%3",[target, data[0], target, data[1]])
	elif target != None and type(data) == list:
		w = ""
		for i in data:
			if type(i) == int or type(i) == bool:
				w +=appendQuery("%0%1%2 %3 ",[target, eq, i, gate])
			else:
				w +=appendQuery("%0%1\'%2\' %3 ", [target, eq, i, gate])
		w = w[:-4]
		if w != "" and outGate != None:
			w = appendQuery("%0 (%s)",[outGate])%(w)
		return (w)


def whereCup(data, gate):
	w = ""
	if type(gate) == list and len(gate) == len(data) - 1:
		gl = 0
		gate += ['']
		for i in data:
			w += appendQuery("%0 (%s)",[gate[gl]])%(i)
			gl += 1
		return (w)
	else:
		w = ""
		for i in data:
			w += appendQuery("%0 (%s)", [gate]) % (i)
		return (w[:-len(gate) + 1])


def runSql(command, args=[],db="fluidpms"):
	if type(args)==str:
		db=args
		args=[]
	c = Connect(db)
	d = c.runSql(command,args)
	c.close()
	return (d)


def appendQuery(query, args):
	i = 0
	bols = ["true", "false"]
	while (i < len(args)):
		if type(args[i])==dict:
			args[i]=json.dumps(args[i])
			query=query[:query.find("%" + str(i)) - 1] + query[query.find("%" + str(i)) - 1:query.find("%" + str(i)) + len("%" + str(i)) + 1].replace('"', "'") + query[query.find("%" + str(i)) + len("%" + str(i)) + 1:]
			query = query.replace("%" + str(i), args[i].replace("'", "\""))
		args[i] = str(args[i])
		if (args[i].replace(".", '', 1)).isnumeric() or args[i].lower() in bols:
			query = query.replace("%" + str(i), args[i])
		else:
			q = query[query.find("%") - 1]
			if q == "'":
				query = query.replace("%" + str(i), args[i].replace(q, "\""))
			elif q == "\"":
				query = query.replace("%" + str(i), args[i].replace(q, "'"))
			else:
				query = query.replace("%" + str(i),(((args[i].replace(")","")).replace(";","")).replace("\"","")).replace("'",""))
		i += 1
	return query


def getTable(table, selection='*', where="", join="", ext="", session=None, columnNames=[], db="fluidpms"):
	c = Connect(db)
	d = c.getTable(table, selection, where, join, ext, session, columnNames)
	c.close()
	return (d)


def updateTable(table, update, where="", session=None, db="fluidpms", returnCount=False, commit=True):
	c = Connect(db)
	d = c.updateTable(table, update, where, session, returnCount, commit)
	c.close()
	return (d)


def insertIntoTable(table, data, returnId=False, session=None, db="fluidpms", commit=True):
	c = Connect(db)
	d = c.insertIntoTable(table, data, returnId, session, commit)
	c.close()
	return (d)


def deleteFromTable(table, where, session=None, db="fluidpms", returnCount=False, commit=True):
	c = Connect(db)
	d = c.deleteFromTable(table, where, session, returnCount, commit)
	c.close()
	return (d)


def columizeTable(data, col, table=None, db="fluidpms"):
	if col == "*":
		col = getColumns(table)
	tab = []
	for row in data:
		bldic = {}
		for i in range(0, len(col)):
			bldic[col[i]] = row[i]
		tab += [bldic]
	return tab


def getListedDictValueFor(dic):
	keys = getDictKeys(dic)
	val = []
	for i in keys:
		val += dic[i]
	return (val)


def SearchListedDictValueFor(dics, val, key, res):
	for d in dics:
		if d[key] == val:
			return (d[res])


def getDictKeys(dic):
	keys = []
	for a in dic:
		keys += [a]
	return keys


def hasId(table, db="fluidpms"):
	c=Connect(db)
	d = c.hasId(table)
	c.close()
	return (d)


def getColumns(table, db="fluidpms"):
	c=Connect(db)
	d = c.getColumns(appendQuery("%0",[table]))
	c.close()
	return (d)


def desc(table, selcol=["name", "type", "null", "key", "default", "extra"], db="fluidpms"):
	c=Connect(db)
	d = c.desc(table, selcol)
	c.close()
	return (d)


class Connect:
	def __init__(self, db="fluidpms"):
		self.d = sqlite3.connect(fileName)
		self.c = self.d.cursor()

	def desc(self, tab, selcol=["name", "type", "null", "key", "default", "extra"]):
		cols = ["name", "type", "null", "key", "default", "extra"]
		if selcol!=cols:
			for i in selcol:
				i=appendQuery("%0",[i])
		try:
			self.c.execute("desc " + appendQuery("%0",[tab]))
			data = self.c.fetchall()
		except:
			print("desc " + appendQuery("%0",[tab]))
			self.c.execute("desc " + appendQuery("%0", [tab]))
		arr = []
		for i in data:
			pack = {}
			for c in range(0, len(cols)):
				if cols[c] in selcol:
					pack[cols[c]] = i[c]
			arr += [pack]
		return (arr)

	def getDictKeys(self, dic):
		keys = []
		for a in dic:
			keys += [a]
		return keys

	def close(self):
		self.d.close()

	def hasId(self, table):
		col = self.getColumns(appendQuery("%0",[table]))
		for i in col:
			if i == 'id':
				return True
		return False

	def appendQuery(self, query, args):
		return appendQuery(query, args)

	def getColumns(self, table):
		try:
			self.c.execute("Select * FROM " +appendQuery("%0",[table]))
		except:
			print("Select * FROM " +appendQuery("%0",[table]))
			self.c.execute("Select * FROM " + appendQuery("%0", [table]))
		return [desc[0] for desc in self.c.description]

	def getTable(self, table, selection='*', where="", join="", ext="", session=None, columnNames=[]):
		col1 = col = selection
		pr=None
		if session != None:
			pr = permissions.read(session, table, where)
			if pr["Authorized"] == False:
				return {"auth": pr["Authorized"], "authdata": pr}
		if selection != '*':
			for i in selection:
				i=i.replace(";","")
			selection = ','.join(selection)
		if where != "":
			if type(where) == dict:
				keys = getDictKeys(where)
				w = " where "
				for i in keys:
					if where[i] == None:
						w += appendQuery("%0 IS NULL AND ",[i])
					elif type(where[i]) == int or type(where[i]) == float or type(where[i]) == bool:
						w += appendQuery("%0 = %1 AND ",[i,where[i]])
					else:
						w += appendQuery("%0 = \"%1\" AND ",[i,where[i]])
				where = w[0:len(w) - 5]
			else:
				where = " where " + where
		if join != "":
			if type(join) == dict:
				keys = getDictKeys(join)
				w = ""
				for i in keys:
					w += appendQuery("%0 = %1 AND ",[i,join[i]])
				join = w[0:len(w) - 5]
			if where != "":
				where = where + " AND " + join
			else:
				where = " where " + join
		if ext != "":
			ext=ext.split(",")
			for i in ext:
				i=appendQuery("%0",[i])
			ext=",".join(ext)
			ext = " " + str(ext)
		if session != None:
			try:
				self.c.execute("SELECT " + selection + " FROM " + appendQuery("%0",[table]) + where + ext)
				data = self.c.fetchall()
			except:
				print("SELECT " + selection + " FROM " + appendQuery("%0", [table]) + where + ext)
				self.c.execute("SELECT " + selection + " FROM " + appendQuery("%0",[table]) + where + ext)  # print("SELECT "+selection)+" FROM "+table+where+ext)
			col = self.getColumns(table)
		data = []
		# if ah.scan([where,selection,table,ext]):
		if 1 == 1:
			# log("SELECT "+selection+" FROM "+table+where+ext)
			try:
				self.c.execute("SELECT " + selection + " FROM " + appendQuery("%0",[table]) + where + ext)
				data = self.c.fetchall()
			except:
				print("SELECT " + selection + " FROM " + appendQuery("%0", [table]) + where + ext)
				self.c.execute("SELECT " + selection + " FROM " + appendQuery("%0",[table]) + where + ext)  # print("SELECT "+selection)+" FROM "+table+where+ext)
		if selection == "*":
			col = self.getColumns(table)
		else:
			col = col1
		if columnNames != []:
			c = []
			for i in range(0, len(col)):
				if columnNames[i] != "" and columnNames[i] != None:
					c += [columnNames[i]]
				else:
					c += [col[i]]
			col = c
		tab = []
		for row in data:
			bldic = {}
			for i in range(0, len(col)):
				if type(row[i]) == decimal.Decimal or type(row[i]) == float:
					bldic[col[i]] = float("{:.2f}".format(float(row[i])))
				else:
					bldic[col[i]] = row[i]
			tab += [bldic]
		if session != None:
			if pr["Authorized"] == False:
				return {"auth": pr["Authorized"], "authdata": pr}
			else:
				return {"auth": pr["Authorized"], "authdata": pr, "data": tab}
		return tab

	def updateTable(self, table, update, where="", session=None, returnCount=False, commit=True):
		pr=None
		if session != None:
			pr = permissions.update(session, table, where, update)
			if commit == False:
				return (pr["Authorized"])
			if pr["Authorized"] == False:
				return {"auth": pr["Authorized"], "authdata": pr}
		keys = getDictKeys(update)
		stat = ""
		for i in keys:
			if type(update[i]) == int or type(update[i]) == float or type(update[i]) == bool:
				stat += appendQuery("%0 = %1,",[i,update[i]])
			elif update[i] == None:
				stat += appendQuery("%0 = NULL,", [i])
			else:
				stat += appendQuery("%0 = \"%1\",",[i,update[i]])
		update = stat[0:len(stat) - 1]
		if where != "":
			if type(where) == dict:
				keys = getDictKeys(where)
				w = " where "
				for i in keys:
					if type(where[i]) == int or type(where[i]) == float or type(where[i]) == bool:
						w += appendQuery("%0 = %1 AND ", [i, where[i]])
					elif where[i] == None:
						w += appendQuery("%0 IS NULL AND ", [i])
					else:
						w += appendQuery("%0 = \"%1\" AND ", [i, where[i]])
				where = w[0:len(w) - 5]
			else:
				where = " where " + where
		count = 0
		if 0==0:
			try:
				self.c.execute("update " + appendQuery("%0",[table]) + " set " + update + where)
				count = self.c.rowcount
				self.d.commit()
			except:
				print("update " + appendQuery("%0", [table]) + " set " + update + where)
				self.c.execute("update " + appendQuery("%0", [table]) + " set " + update + where)
		if session != None:
			return {"auth": pr["Authorized"], "authdata": pr, "count": count}
		else:
			if (count):
				return (count)

	def insertIntoTable(self, table, data, returnId=False, session=None, commit=True):
		meta = data
		pr=None
		if session != None:
			pr = permissions.insert(session, table, data)
			if commit == False:
				return (pr["Authorized"])
			if pr["Authorized"] == False:
				return {"auth": pr["Authorized"], "authdata": pr}
		keys = getDictKeys(data)
		val = ""
		for i in keys:
			if type(data[i]) == int or type(data[i]) == float or type(data[i]) == bool:
				val += appendQuery("%0,",[data[i]])
			elif data[i] == None:
				val += "null,"
			else:
				val += appendQuery("\"%0\",", [data[i]])
		val = val[0:len(val) - 1]
		k = ""
		for i in keys:
			k += appendQuery("%0,", [i])
		keys = k[0:len(k) - 1]
		Id = None
		if 0==0:
			try:
				self.c.execute("INSERT INTO " + appendQuery("%0",[table]) + "(" + keys + ") VALUES(" + val + ")")
				if returnId:
					self.c.execute("SELECT LAST_INSERT_ID()")
					Id = self.c.fetchone()[0]
				self.d.commit()
			except:
				print("INSERT INTO " + appendQuery("%0", [table]) + "(" + keys + ") VALUES(" + val + ")")
				self.c.execute("INSERT INTO " + appendQuery("%0", [table]) + "(" + keys + ") VALUES(" + val + ")")
		if session != None:
			self.c.execute("update log set tabId=%s where id=%s" % (str(Id), str(pr["logId"])))
			self.d.commit()
			del (pr["logId"])
			return {"auth": pr["Authorized"], "authdata": pr, "id": Id}
		if returnId:
			return Id

	def deleteFromTable(self, table, where, session=None, returnCount=False, commit=True):
		pr=None
		if session != None:
			pr = permissions.delete(session, table, where)
			if commit == False:
				return (pr["Authorized"])
			if pr["Authorized"] == False:
				return {"auth": pr["Authorized"], "authdata": pr}
		# log(pr["Authorized"])
		if where != "":
			if type(where) == dict:
				keys = getDictKeys(where)
				w = " where "
				for i in keys:
					if type(where[i]) == int or type(where[i]) == float or type(where[i]) == bool:
						w += appendQuery("%0 = %1 AND ",[i,where[i]])
					elif where[i] == None:
						w += appendQuery("%0 IS NULL AND ",[i])
					else:
						w += appendQuery("%0 = \"%1\" AND ",[i,where[i]])
				where = w[0:len(w) - 5]
			else:
				where = " where " + where
		count = 0
		if 0==0:
			try:
				self.c.execute("DELETE FROM " + appendQuery("%0",[table]) + " " + where)
				count = self.c.rowcount
				self.d.commit()
			except:
				print("DELETE FROM " + appendQuery("%0", [table]) + " " + where)
				self.c.execute("DELETE FROM " + appendQuery("%0", [table]) + " " + where)
		if session != None:
			return {"auth": pr["Authorized"], "authdata": pr, "count": count}
		else:
			if (returnCount):
				return (count)

	def runSql(self, command,args=[]):
		if args != []:
			command=appendQuery(command,args)
		try:
			self.c.execute(command)
		except:
			print(command)
			self.c.execute(command)
		resp = self.c.fetchall()
		self.d.commit()
		return resp


def log(data):
	f = open("logFile.txt", "a")
	stat = data
	f.write("{}".format(stat))
	f.write("\n")
	f.close()
