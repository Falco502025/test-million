import { useAlert } from '@/hooks/useAlert';
import { act, renderHook } from '@testing-library/react';

describe('useAlert Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with no alert', () => {
    const { result } = renderHook(() => useAlert());
    
    expect(result.current.alert).toBeNull();
  });

  it('shows alert with custom message and severity', () => {
    const { result } = renderHook(() => useAlert());
    
    act(() => {
      result.current.showAlert('Test message', 'success');
    });
    
    expect(result.current.alert).toEqual({
      message: 'Test message',
      severity: 'success',
    });
  });

  it('shows error alert', () => {
    const { result } = renderHook(() => useAlert());
    
    act(() => {
      result.current.showAlert('Error occurred', 'error');
    });
    
    expect(result.current.alert?.message).toBe('Error occurred');
    expect(result.current.alert?.severity).toBe('error');
  });

  it('shows warning alert', () => {
    const { result } = renderHook(() => useAlert());
    
    act(() => {
      result.current.showAlert('Warning message', 'warning');
    });
    
    expect(result.current.alert?.severity).toBe('warning');
  });

  it('hides alert', () => {
    const { result } = renderHook(() => useAlert());
    
    act(() => {
      result.current.showAlert('Test', 'info');
    });
    expect(result.current.alert).not.toBeNull();
    
    act(() => {
      result.current.hideAlert();
    });
    
    expect(result.current.alert).toBeNull();
  });

  it('updates message when showAlert is called multiple times', () => {
    const { result } = renderHook(() => useAlert());
    
    act(() => {
      result.current.showAlert('First message', 'info');
    });
    expect(result.current.alert?.message).toBe('First message');
    
    act(() => {
      result.current.showAlert('Second message', 'error');
    });
    expect(result.current.alert?.message).toBe('Second message');
    expect(result.current.alert?.severity).toBe('error');
  });

  it('auto-dismisses alert after 6 seconds', () => {
    const { result } = renderHook(() => useAlert());
    
    act(() => {
      result.current.showAlert('Test message', 'info');
    });
    
    expect(result.current.alert).not.toBeNull();
    
    act(() => {
      jest.runAllTimers();
    });
    
    expect(result.current.alert).toBeNull();
  });

  it('handles rapid show and hide calls', () => {
    const { result } = renderHook(() => useAlert());
    
    act(() => {
      result.current.showAlert('Message 1', 'info');
    });
    act(() => {
      result.current.hideAlert();
    });
    act(() => {
      result.current.showAlert('Message 2', 'error');
    });
    
    expect(result.current.alert?.message).toBe('Message 2');
    expect(result.current.alert).not.toBeNull();
  });
});
