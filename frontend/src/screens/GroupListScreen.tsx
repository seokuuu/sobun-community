import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { Group, GroupStatus } from '@sobun/shared';
import ApiService from '../services/api';

interface GroupListScreenProps {
  navigation: any;
}

export default function GroupListScreen({ navigation }: GroupListScreenProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadGroups = async () => {
    try {
      const response = await ApiService.getGroups();
      if (response.success) {
        setGroups(response.data);
      }
    } catch (error) {
      Alert.alert('오류', '그룹 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadGroups();
  };

  const getStatusText = (status: GroupStatus) => {
    switch (status) {
      case GroupStatus.RECRUITING:
        return '모집 중';
      case GroupStatus.ACTIVE:
        return '진행 중';
      case GroupStatus.COMPLETED:
        return '완료';
      case GroupStatus.CANCELLED:
        return '취소됨';
      default:
        return '알 수 없음';
    }
  };

  const getStatusColor = (status: GroupStatus) => {
    switch (status) {
      case GroupStatus.RECRUITING:
        return '#4CAF50';
      case GroupStatus.ACTIVE:
        return '#FF9800';
      case GroupStatus.COMPLETED:
        return '#9E9E9E';
      case GroupStatus.CANCELLED:
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderGroupItem = ({ item }: { item: Group }) => (
    <TouchableOpacity
      style={styles.groupItem}
      onPress={() => navigation.navigate('GroupDetail', { groupId: item.id })}
    >
      <View style={styles.groupHeader}>
        <Text style={styles.groupTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.groupStore}>{item.store}</Text>
      <Text style={styles.groupLocation}>{item.location}</Text>
      
      <View style={styles.groupInfo}>
        <Text style={styles.infoText}>
          마감: {formatDate(item.deadline)}
        </Text>
        <Text style={styles.infoText}>
          참여: {item.memberCount || 0}/{item.maxMembers}명
        </Text>
      </View>
      
      <Text style={styles.pickupInfo}>
        픽업: {item.pickupLocation} ({formatDate(item.pickupTime)})
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>등록된 그룹이 없습니다.</Text>
          </View>
        }
      />
      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateGroup')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupItem: {
    backgroundColor: '#fff',
    margin: 8,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  groupStore: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 4,
  },
  groupLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  groupInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
  pickupInfo: {
    fontSize: 14,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});